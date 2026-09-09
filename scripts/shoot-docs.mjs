#!/usr/bin/env node
// Regenerates the README screenshot from the built site.
//
// It exists because the old one was a 2.4 MB, 2560px PNG displayed at 680px,
// hand-captured at some forgotten point and steadily drifting out of date as
// the site changed. A screenshot nobody can reproduce is a screenshot that goes
// stale; this makes it one command.
//
// Run after `npm run build`:  node scripts/shoot-docs.mjs

import { spawn } from "node:child_process";
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
  height: 1400,
  deviceScaleFactor: SCALE,
});
await page.goto(BASE, { waitUntil: "load" });
await page.evaluateHandle("document.fonts.ready");
// The GIF cameos animate; a beat lets them settle on a representative frame.
await wait(2500);

await page.screenshot({ path: OUT, type: "webp", quality: 85, fullPage: true });
await browser.close();
server.kill();

const kb = (statSync(OUT).size / 1024).toFixed(0);
console.log(`  wrote ${OUT} — ${kb} KB at ${WIDTH}x${SCALE} device pixels`);
