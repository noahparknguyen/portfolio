#!/usr/bin/env node
// Draws every raster icon from public/favicon.svg. That file is <Pin> from
// src/components/ui/Pin.jsx as an SVG: the same 16px disc, 2px ink ring, and
// 4px paper highlight. Run this after changing the SVG, then `npm run
// check:icons`.
//
// Chrome draws them, since a browser is what draws the SVG in a tab. Each file
// is drawn from the vector at its own size, never scaled from another.

import { readFileSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";
import { findChrome } from "./preview.mjs";

const SVG = readFileSync("public/favicon.svg", "utf8");

// The card the banner's pin is pushed into. iOS shows a transparent pixel as
// black, so the home-screen icon needs a fill.
const PAPER = readFileSync("src/index.css", "utf8").match(
  /--color-paper:\s*(#[0-9a-f]{6})/i,
)[1];

// Browsers pick a size from the .ico. The 32 is what `sizes="32x32"` in
// index.html promises, and the 16 is drawn for screens at 100%.
const ICO_SIZES = [16, 32];

// 20px of paper around the apple-touch icon, so iOS's rounded corners don't
// clip the pin.
const PNGS = [
  { file: "public/apple-touch-icon.png", size: 180, padding: 20, fill: PAPER },
  { file: "public/android-chrome-192x192.png", size: 192 },
  { file: "public/android-chrome-512x512.png", size: 512 },
];

// Runs in the page: the SVG drawn into a canvas, as PNG bytes and as pixels.
async function draw(svg, { size, padding = 0, fill = null }) {
  const img = new Image();
  img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, size, size);
  }
  ctx.drawImage(img, padding, padding, size - 2 * padding, size - 2 * padding);
  return {
    png: canvas.toDataURL("image/png").split(",")[1],
    rgba: Array.from(ctx.getImageData(0, 0, size, size).data),
  };
}

// An .ico of 32-bit bitmaps, the format every favicon reader takes. Each entry
// is its colour rows bottom-up in BGRA, then a 1-bit mask (set where a pixel is
// fully transparent) for readers that ignore alpha.
function ico(images) {
  const entries = images.map(({ size, rgba }) => {
    const header = Buffer.alloc(40);
    header.writeUInt32LE(40, 0);
    header.writeInt32LE(size, 4);
    header.writeInt32LE(size * 2, 8); // the colour rows and the mask, stacked
    header.writeUInt16LE(1, 12);
    header.writeUInt16LE(32, 14);
    const pixels = Buffer.alloc(size * size * 4);
    const maskRow = Math.ceil(size / 32) * 4;
    const mask = Buffer.alloc(maskRow * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const from = (y * size + x) * 4;
        const row = size - 1 - y;
        const to = (row * size + x) * 4;
        pixels[to] = rgba[from + 2];
        pixels[to + 1] = rgba[from + 1];
        pixels[to + 2] = rgba[from];
        pixels[to + 3] = rgba[from + 3];
        if (rgba[from + 3] === 0)
          mask[row * maskRow + (x >> 3)] |= 0x80 >> (x & 7);
      }
    }
    return Buffer.concat([header, pixels, mask]);
  });
  const dir = Buffer.alloc(6 + 16 * images.length);
  dir.writeUInt16LE(1, 2); // type 1: an icon
  dir.writeUInt16LE(images.length, 4);
  let offset = dir.length;
  images.forEach(({ size }, i) => {
    const at = 6 + 16 * i;
    dir[at] = size;
    dir[at + 1] = size;
    dir.writeUInt16LE(1, at + 4); // colour planes
    dir.writeUInt16LE(32, at + 6); // bits per pixel
    dir.writeUInt32LE(entries[i].length, at + 8);
    dir.writeUInt32LE(offset, at + 12);
    offset += entries[i].length;
  });
  return Buffer.concat([dir, ...entries]);
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--force-color-profile=srgb"],
});
const page = await browser.newPage();

for (const icon of PNGS) {
  const { png } = await page.evaluate(draw, SVG, icon);
  writeFileSync(icon.file, Buffer.from(png, "base64"));
  console.log(`  wrote ${icon.file} — ${icon.size}x${icon.size}`);
}

const frames = [];
for (const size of ICO_SIZES) {
  frames.push({ size, ...(await page.evaluate(draw, SVG, { size })) });
}
writeFileSync("public/favicon.ico", ico(frames));
console.log(`  wrote public/favicon.ico — ${ICO_SIZES.join(", ")}`);

await browser.close();
