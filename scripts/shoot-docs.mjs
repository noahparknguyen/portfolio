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

// The top of the page rather than `fullPage`, which resizes the viewport so the
// fixed sky stops covering the bottom. The height should end in a gap between
// rows, so nothing is cut in half.
const HEIGHT = 940;

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
await page.setViewport({
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: SCALE,
});
await page.goto(BASE, { waitUntil: "load" });
await page.evaluateHandle("document.fonts.ready");
// The GIF cameos animate, so a beat lets them settle on a representative frame.
await wait(2500);

await page.screenshot({ path: OUT, type: "webp", quality: 85 });
await browser.close();
stopServer();

const kb = (statSync(OUT).size / 1024).toFixed(0);
console.log(`  wrote ${OUT} — ${kb} KB, ${WIDTH}x${HEIGHT} at ${SCALE}x`);
