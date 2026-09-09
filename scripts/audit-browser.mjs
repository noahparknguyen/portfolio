#!/usr/bin/env node
// The checks that only a real browser can answer: horizontal overflow, computed
// colour contrast, and image scaling. Every one of these caught something during
// the full review, and none of them is visible to ESLint, Prettier or a unit
// test — so they run in CI rather than living in someone's memory.
//
// Serves the production build with `vite preview`, so it audits what actually
// ships. The /api/* routes are absent there, which is deliberate: the widgets
// fall back to their empty states, and an empty state is the layout most likely
// to be wrong and least likely to be looked at.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const PATHS = ["/", "/about", "/now", "/creations", "/credits", "/nope-404"];
const WIDTHS = [320, 375, 768, 1024];

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const problems = [];

// --- contrast helpers -------------------------------------------------------
const CONTRAST_SCAN = () => {
  const parse = (c) => {
    const m = c.match(/[\d.]+/g);
    return m ? m.slice(0, 3).map(Number) : null;
  };
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const lum = ([r, g, b]) =>
    0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => {
    const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (l1 + 0.05) / (l2 + 0.05);
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const p = parse(c);
      const alpha = (c.match(/[\d.]+/g) || [])[3];
      if (p && alpha !== "0") return p;
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  const out = [];
  let scanned = 0;
  document.querySelectorAll("*").forEach((el) => {
    if (el.offsetParent === null) return;
    if (el.closest("[aria-hidden=true]")) return;
    if (
      ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    )
      return;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.opacity === "0") return;
    const fg = parse(cs.color);
    if (!fg) return;
    const size = parseFloat(cs.fontSize);
    const weight = parseInt(cs.fontWeight, 10) || 400;
    const need = size >= 24 || (size >= 18.66 && weight >= 700) ? 3 : 4.5;
    scanned++;
    const r = ratio(fg, bgOf(el));
    if (r < need) {
      out.push({
        text: el.innerText.trim().replace(/\s+/g, " ").slice(0, 44),
        ratio: Math.round(r * 100) / 100,
        need,
      });
    }
  });
  return { scanned, failures: out };
};

// Tilt caps (STYLE_GUIDE.md -> Handcrafted layer -> Slight rotation): <= ~3 deg,
// and <= ~1.5 deg on anything wider than a compact card. The width threshold is
// what makes this checkable — a fixed angle's visible skew grows with width, so
// the same 2 deg that reads as charm on an 80px stamp reads as a mistake on a
// 296px panel. 280px is "wider than a compact card": at 320px every panel in
// the column clears it, which is exactly the case the cap exists for.
//
// Tailwind v4 emits the standalone `rotate` property, NOT a transform matrix.
// Reading `transform` here returns "none" for every tilted object on the site
// and reports a clean sweep over nothing.
const ROTATION_SCAN = () => {
  const WIDE_PX = 280;
  const out = [];
  let scanned = 0;
  document.querySelectorAll("*").forEach((el) => {
    if (el.offsetParent === null) return;
    const cs = getComputedStyle(el);
    let deg = null;
    if (cs.rotate && cs.rotate !== "none") deg = parseFloat(cs.rotate);
    if (deg === null || Number.isNaN(deg) || deg === 0) return;
    if (el.dataset.counterRotated) return; // see Tape.jsx
    scanned++;
    const width = el.getBoundingClientRect().width;
    const cap = width > WIDE_PX ? 1.5 : 3;
    if (Math.abs(deg) > cap + 0.01) {
      out.push({
        deg,
        cap,
        width: Math.round(width),
        text: (el.innerText || el.className || "")
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 38),
      });
    }
  });
  return { scanned, failures: out };
};

// Straight apostrophes and quotes in RENDERED copy. Every one on the site is
// typographic, and the only way they creep back in is exactly how they did:
// hand-editing a string through a tool that emits U+0027 instead of U+2019.
// Source-level greps cannot separate copy from code comments; the rendered page
// can, because comments never render.
const TYPOGRAPHY_SCAN = () => {
  const main = document.querySelector("main");
  if (!main) return [];
  const text = main.innerText;
  const out = [];
  for (const m of text.matchAll(/[A-Za-z]'[a-z]/g)) {
    out.push(
      text.slice(Math.max(0, m.index - 34), m.index + 26).replace(/\s+/g, " "),
    );
  }
  for (const m of text.matchAll(/"[^"\n]{1,50}"/g)) {
    out.push(
      text.slice(Math.max(0, m.index - 20), m.index + 40).replace(/\s+/g, " "),
    );
  }
  return out;
};

const IMAGE_SCAN = () =>
  [...document.querySelectorAll("img")]
    .filter((i) => i.offsetParent !== null && i.naturalWidth)
    .map((i) => ({
      src: i.currentSrc.split("/").pop().split("?")[0].slice(0, 40),
      up: Math.round(i.getBoundingClientRect().width) > i.naturalWidth + 1,
      dims: i.hasAttribute("width") && i.hasAttribute("height"),
    }));

// --- run --------------------------------------------------------------------
const chrome = findChrome();
if (!chrome) {
  console.error("  ✗ no Chrome binary found; set CHROME_PATH");
  process.exit(1);
}

// Refuse to run against a server this script did not start.
//
// `server.kill()` does not reliably take down the whole `npx vite preview`
// process tree, so an interrupted run can leave an orphan holding the port. The
// next run's own preview then fails to bind, the audit connects to the ORPHAN
// instead — which is serving a stale dist whose hashed assets no longer exist —
// and every page comes up blank. Detecting that is what the sanity floors at
// the end are for; not walking into it is better.
try {
  const stale = await fetch(BASE, { signal: AbortSignal.timeout(2000) });
  if (stale.ok) {
    console.error(
      `  ✗ something is already serving ${BASE}. This audit must start its own\n` +
        `    preview so it is auditing the current build. Stop that process and re-run.`,
    );
    process.exit(1);
  }
} catch {
  // Nothing there, which is what we want.
}

// `detached` puts the child in its own process group so the whole tree can be
// signalled, rather than just the `npx` shim.
const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort"],
  { stdio: "ignore", detached: true },
);
const stopServer = () => {
  try {
    process.kill(-server.pid, "SIGKILL");
  } catch {
    server.kill("SIGKILL");
  }
};
process.on("exit", stopServer);
process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});

let up = false;
for (let i = 0; i < 60 && !up; i++) {
  await wait(500);
  try {
    const res = await fetch(BASE);
    up = res.ok;
  } catch {
    /* not yet */
  }
}
if (!up) {
  console.error("  ✗ vite preview did not come up");
  stopServer();
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

let overflowChecks = 0;
let contrastChecks = 0;
let imageChecks = 0;
let rotationChecks = 0;

for (const width of WIDTHS) {
  for (const path of PATHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 1200 });
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle2" });
    await page.evaluateHandle("document.fonts.ready");
    await wait(400);

    const over = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    overflowChecks++;
    if (over > 0) {
      problems.push(`${path} @${width}px overflows horizontally by ${over}px`);
    }

    const contrast = await page.evaluate(CONTRAST_SCAN);
    contrastChecks += contrast.scanned;
    for (const f of contrast.failures) {
      problems.push(
        `${path} @${width}px contrast ${f.ratio}:1 (needs ${f.need}) — "${f.text}"`,
      );
    }

    const rotations = await page.evaluate(ROTATION_SCAN);
    rotationChecks += rotations.scanned;
    for (const r of rotations.failures) {
      problems.push(
        `${path} @${width}px tilt ${r.deg}deg exceeds the ${r.cap}deg cap for a ` +
          `${r.width}px-wide object — "${r.text}"`,
      );
    }

    for (const t of await page.evaluate(TYPOGRAPHY_SCAN)) {
      problems.push(`${path} @${width}px straight quote in copy — …${t}…`);
    }

    for (const img of await page.evaluate(IMAGE_SCAN)) {
      imageChecks++;
      if (img.up) problems.push(`${path} @${width}px upscales ${img.src}`);
      if (!img.dims)
        problems.push(`${path} @${width}px ${img.src} has no width/height`);
    }

    await page.close();
  }
}

await browser.close();
stopServer();

// A check that can pass while measuring nothing is worse than no check at all.
// This audit once reported "clean" having scanned 0 text elements and 0 images,
// because the machine was out of memory and every page came up blank — the
// overflow check still "passed" on an empty document. These floors turn that
// silent success into a loud failure.
if (contrastChecks < 100) {
  problems.push(
    `only ${contrastChecks} text elements were scanned across ${PATHS.length} pages — ` +
      `the pages almost certainly did not render, so this run proves nothing`,
  );
}
if (imageChecks < 10) {
  problems.push(
    `only ${imageChecks} images were found across ${PATHS.length} pages — ` +
      `the pages almost certainly did not render, so this run proves nothing`,
  );
}

console.log(
  `  ok  ${overflowChecks} page/width combinations checked for overflow`,
);
console.log(
  `  ok  ${contrastChecks} text elements checked for WCAG AA contrast`,
);
console.log(
  `  ok  ${imageChecks} rendered images checked for upscaling and dimensions`,
);
console.log(
  `  ok  ${rotationChecks} rotated objects checked against the width-dependent tilt cap`,
);
console.log(`  ok  rendered copy checked for straight quotes and apostrophes`);

if (problems.length) {
  console.error(`\n  ${problems.length} problem(s):`);
  for (const p of [...new Set(problems)]) console.error(`  ✗  ${p}`);
  process.exit(1);
}
console.log("\n  browser audit clean");
