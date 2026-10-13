#!/usr/bin/env node
/**
 * Vendors the webfonts: downloads the four families into `public/fonts/`, and
 * writes the matching `@font-face` rules to `src/fonts.css`, which
 * `src/index.css` imports.
 *
 * Self-hosted, the site makes no font request to anyone else, and the rules
 * ship in the stylesheet the page already downloads, so the font files start a
 * round trip earlier than they would behind Google's CSS.
 *
 * All four are variable fonts, so Google serves one file per family and
 * character subset, whatever the weight. Each file is downloaded once, and
 * every weight's rule points at it.
 *
 * Only latin and latin-ext are kept. The site is in English, and the widest
 * characters it renders are accented Latin ones.
 *
 * Run on demand, and commit the output:
 *   npm run vendor:fonts
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "fonts");
const CSS_OUT = path.join(ROOT, "src", "fonts.css");
const LICENSE_DIR = path.join(ROOT, "licenses");

// The weights on the type scale (normal, semibold, and bold), plus Lilita
// One's single weight. Caveat is handwriting, and only ever regular or
// semibold. Must match the --font-* tokens in src/index.css.
const HREF =
  "https://fonts.googleapis.com/css2" +
  "?family=Fredoka:wght@400;600;700" +
  "&family=Nunito:wght@400;600;700" +
  "&family=Lilita+One" +
  "&family=Caveat:wght@400;600" +
  "&display=swap";

// A modern desktop user agent, or Google serves the TTF fallback stylesheet
// instead of the woff2 one, and woff2 is the point of vendoring these.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const KEEP = new Set(["latin", "latin-ext"]);

// The licences are vendored with the fonts, not added beside them by hand.
// All four families are SIL OFL 1.1, which requires the licence text to be
// distributed with the font software. Fetching it here means a re-vendor can't
// write fonts without their terms: if upstream moves, this throws.
const LICENSES = ["Fredoka", "Nunito", "Lilita One", "Caveat"].map(
  (family) => ({
    file: `OFL-${family.replace(/\s+/g, "")}.txt`,
    url: `https://raw.githubusercontent.com/google/fonts/main/ofl/${family.toLowerCase().replace(/\s+/g, "")}/OFL.txt`,
  }),
);

await mkdir(LICENSE_DIR, { recursive: true });
for (const { file, url } of LICENSES) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${file}: ${res.status} from ${url}`);
  const text = await res.text();
  // Some hosts send a 404 page with a 200, and an OFL that doesn't say so isn't
  // one.
  if (!text.includes("SIL OPEN FONT LICENSE"))
    throw new Error(`${file}: fetched text is not an OFL licence`);
  await writeFile(path.join(LICENSE_DIR, file), text);
  console.log(`  licence  ${file}`);
}

const cssRes = await fetch(HREF, { headers: { "User-Agent": UA } });
if (!cssRes.ok) throw new Error(`Google Fonts CSS: ${cssRes.status}`);
const css = await cssRes.text();

// The stylesheet is a flat list of `/* subset */` comments, each followed by one
// @font-face. Parsed rather than rewritten in place, so the output is our own
// file with our own paths, not an edited copy of theirs.
const blocks = [
  ...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g),
];

await mkdir(OUT_DIR, { recursive: true });

const rules = [];
const fileFor = new Map(); // file name -> the URL it was downloaded from

for (const [, subset, block] of blocks) {
  if (!KEEP.has(subset)) continue;

  const family = block.match(/font-family:\s*'([^']+)'/)?.[1];
  const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
  const url = block.match(/src:\s*url\(([^)]+)\)/)?.[1];
  const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
  if (!family || !weight || !url) continue;

  const file = `${family.toLowerCase().replace(/\s+/g, "-")}-${subset}.woff2`;

  // One file per family and subset holds only if the family is variable. If
  // Google ever serves separate files per weight, two weights would claim the
  // same name, so this stops rather than keep whichever came last.
  const known = fileFor.get(file);
  if (known && known !== url) {
    throw new Error(
      `${family} ${subset} has more than one file; name the files by weight`,
    );
  }
  if (!known) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`${file}: ${res.status} from ${url}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    await writeFile(path.join(OUT_DIR, file), bytes);
    fileFor.set(file, url);
    console.log(`  ${file.padEnd(28)} ${(bytes.length / 1024).toFixed(1)} kB`);
  }

  rules.push(
    [
      `/* ${family} ${weight}, ${subset} */`,
      `@font-face {`,
      `  font-family: "${family}";`,
      `  font-style: normal;`,
      `  font-weight: ${weight};`,
      // swap, not the default block: the fallback stack in the --font-*
      // tokens renders immediately, and is replaced when the file lands.
      `  font-display: swap;`,
      `  src: url("/fonts/${file}") format("woff2");`,
      ...(range ? [`  unicode-range: ${range};`] : []),
      `}`,
    ].join("\n"),
  );
}

if (fileFor.size === 0)
  throw new Error("No faces matched. Did the CSS change?");

await writeFile(
  CSS_OUT,
  [
    "/* GENERATED by scripts/vendor-fonts.mjs. Don't edit by hand.",
    " * Run `npm run vendor:fonts` to regenerate. Imported by src/index.css.",
    " * The files live in public/fonts/ and are committed. */",
    "",
    ...rules,
    "",
  ].join("\n"),
);

console.log(
  `\n${fileFor.size} files → public/fonts/, ${rules.length} rules → src/fonts.css ✓`,
);
