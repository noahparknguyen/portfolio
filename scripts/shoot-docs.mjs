#!/usr/bin/env node
// Regenerates the README screenshot. Run after `npm run build`.

import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import puppeteer from "puppeteer-core";
import { findChrome, startPreview } from "./preview.mjs";

const PORT = 4174;
const OUT = "docs/home.webp";

// The README shows it 680px wide, so 1.5x is still over 2x there.
const WIDTH = 1024;
const SCALE = 1.5;

// The masthead and the board, ending in the gap above the toolset strip. Not
// `fullPage`, which resizes the viewport so the fixed sky stops covering the
// bottom. The gap is measured on each run, since live data changes the board's
// height. Edges come from every visible descendant, since tilted pieces
// overhang their boxes, plus the 4px shadow. A descendant is clipped to any
// ancestor that hides overflow, like the Devlog's scroll box.
function boardGap() {
  const parts = [
    ...document.querySelector('[aria-labelledby="home-heading"]').children,
  ];
  const toolset = parts.pop();
  const shown = (n) => {
    const r = n.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) return null;
    let { top, bottom } = r;
    for (let a = n.parentElement; a; a = a.parentElement) {
      if (getComputedStyle(a).overflowY === "visible") continue;
      const c = a.getBoundingClientRect();
      top = Math.max(top, c.top);
      bottom = Math.min(bottom, c.bottom);
    }
    return bottom > top ? { top, bottom } : null;
  };
  const boxes = (els) =>
    els.flatMap((el) => [el, ...el.querySelectorAll("*")]).map(shown);
  const end = Math.max(...boxes(parts).map((r) => r?.bottom ?? -Infinity));
  const start = Math.min(...boxes([toolset]).map((r) => r?.top ?? Infinity));
  return { end: end + 4 + window.scrollY, start: start + window.scrollY };
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Without an emoji font, headless Chrome draws the Live Reaction strawberry as
// an empty box.
function hasEmojiFont() {
  try {
    return /emoji/i.test(execSync("fc-list", { encoding: "utf8" }));
  } catch {
    return true; // No fontconfig to ask, so assume there's one.
  }
}

if (!hasEmojiFont()) {
  console.warn(
    "  WARNING: no emoji font on this machine, so the strawberry in the Live\n" +
      "  Reaction label will capture as an empty box. Install one first:\n" +
      "    sudo apt install fonts-noto-color-emoji",
  );
}

const chrome = findChrome();
const { base: BASE, stop: stopServer } = await startPreview(PORT);

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--force-color-profile=srgb"],
});
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: 900, deviceScaleFactor: SCALE });
await page.goto(BASE, { waitUntil: "load" });
await page.evaluateHandle("document.fonts.ready");
// The GIF cameos animate, so a beat lets them settle on a representative frame,
// and the widgets' data arrive.
await wait(2500);

const gap = await page.evaluate(boardGap);
if (gap.start <= gap.end) {
  console.error("  ✗ no gap between the board and the toolset strip to cut in");
  process.exit(1);
}
const height = Math.round((gap.start + gap.end) / 2);
await page.setViewport({ width: WIDTH, height, deviceScaleFactor: SCALE });
await wait(500);

await page.screenshot({ path: OUT, type: "webp", quality: 85 });
await browser.close();
stopServer();

const kb = (statSync(OUT).size / 1024).toFixed(0);
console.log(`  wrote ${OUT} — ${kb} KB, ${WIDTH}x${height} at ${SCALE}x`);
