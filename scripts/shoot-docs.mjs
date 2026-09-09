#!/usr/bin/env node
// Regenerates the README screenshot from the built site.
//
// It exists because the old one was a 2.4 MB, 2560px PNG displayed at 680px,
// hand-captured at some forgotten point and steadily drifting out of date as
// the site changed. A screenshot nobody can reproduce is a screenshot that goes
// stale; this makes it one command.
//
// Run after `npm run build`:  node scripts/shoot-docs.mjs

import { execSync, spawn } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import puppeteer from "puppeteer-core";

const PORT = 4174;
const BASE = `http://localhost:${PORT}`;
const OUT = "docs/home.webp";

// Captured at the design width with a 1.5x pixel ratio. The README displays it
// at 680px, so 1536 device pixels is still well over 2x there — 2x capture gave
// 2048px and 454 KB for no visible gain, and the original hand-made PNG was
// 2560px and 2.4 MB.
const WIDTH = 1024;
const SCALE = 1.5;

// A framed shot of the top of the page, NOT `fullPage`. The home page is 1670px
// tall at this width, which at the 680px the README displays it comes out over a
// thousand pixels long — and a full-page capture resizes the viewport, so the
// fixed sky layer stops covering and the bottom turns into flat colour.
//
// 940px cuts in the gap between rows two and three (row 2 ends at 925, row 3
// starts at 945), so nothing is sliced in half. It keeps the masthead, the
// welcome letter, the polaroid and the whole widget row, which is enough to show
// what the site is.
const HEIGHT = 940;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  for (const c of [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ]) {
    if (c && existsSync(c)) return c;
  }
  return null;
}

// The Live Reaction label contains a strawberry. Without an emoji font on the
// machine, headless Chrome draws it as a tofu box, and the README then shows
// what looks like a broken glyph on a site that renders it fine for every real
// visitor. Warn rather than ship that silently.
function hasEmojiFont() {
  try {
    return /emoji/i.test(execSync("fc-list", { encoding: "utf8" }));
  } catch {
    return true; // no fontconfig to ask; assume the platform has one
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
if (!chrome) {
  console.error("  no Chrome binary found; set CHROME_PATH");
  process.exit(1);
}

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort"],
  { stdio: "ignore" },
);
process.on("exit", () => server.kill());

let up = false;
for (let i = 0; i < 60 && !up; i++) {
  await wait(500);
  try {
    up = (await fetch(BASE)).ok;
  } catch {
    /* not yet */
  }
}
if (!up) {
  console.error("  vite preview did not come up");
  server.kill();
  process.exit(1);
}

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
// The GIF cameos animate; a beat lets them settle on a representative frame.
await wait(2500);

await page.screenshot({ path: OUT, type: "webp", quality: 85 });
await browser.close();
server.kill();

const kb = (statSync(OUT).size / 1024).toFixed(0);
console.log(`  wrote ${OUT} — ${kb} KB, ${WIDTH}x${HEIGHT} at ${SCALE}x`);
