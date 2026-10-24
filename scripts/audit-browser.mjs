#!/usr/bin/env node
// The checks only a real browser can answer: overflow, computed contrast, image
// scaling, tilt, and straight quotes, run against the production build. In CI
// the Worker has no API credentials, so the widgets show their empty states. A
// local run with `.dev.vars` checks their filled ones.

import puppeteer from "puppeteer-core";
import { findChrome, startPreview } from "./preview.mjs";

const PORT = 4173;
const PATHS = ["/", "/about", "/now", "/creations", "/credits", "/nope-404"];
const WIDTHS = [320, 375, 768, 1024];

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

// Tilt caps: 3 degrees, and 1.5 on anything wider than 280px, since a fixed
// angle's skew grows with width. Tailwind v4 emits the `rotate` property, not a
// transform, so reading `transform` would find nothing to check.
const ROTATION_SCAN = () => {
  // `className` is an SVGAnimatedString on SVG elements, so read the
  // attribute instead.
  const describe = (el) =>
    (el.innerText || el.getAttribute("class") || el.tagName || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 38);
  const WIDE_PX = 280;
  const out = [];
  let scanned = 0;
  document.querySelectorAll("*").forEach((el) => {
    if (el.offsetParent === null) return;
    const cs = getComputedStyle(el);
    let deg = null;
    if (cs.rotate && cs.rotate !== "none") deg = parseFloat(cs.rotate);
    if (deg === null || Number.isNaN(deg) || deg === 0) return;
    if (el.dataset.tiltExempt) return; // Tape.jsx, SteamWidget.jsx
    scanned++;
    const width = el.getBoundingClientRect().width;
    const cap = width > WIDE_PX ? 1.5 : 3;
    if (Math.abs(deg) > cap + 0.01) {
      out.push({
        deg,
        cap,
        width: Math.round(width),
        text: describe(el),
      });
    }
  });
  return { scanned, failures: out };
};

// Straight apostrophes and quotes in rendered copy, where code comments can't
// set the check off.
const TYPOGRAPHY_SCAN = () => {
  const main = document.querySelector("main");
  if (!main) return [];
  // Live third-party strings are skipped, since their punctuation isn't the
  // site's to control.
  const clone = main.cloneNode(true);
  clone.querySelectorAll("[data-live-text]").forEach((n) => n.remove());
  const text = clone.textContent;
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
const { base: BASE, stop: stopServer } = await startPreview(PORT);

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
    // `load`, not network idle, which the polling widgets never reliably
    // reach.
    await page.goto(`${BASE}${path}`, { waitUntil: "load" });
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

// Floors, so a run where every page came up blank fails instead of passing on
// empty documents.
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
