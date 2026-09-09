#!/usr/bin/env node
// Enumerates every Tailwind utility used in src/ and groups it by the property
// it controls, so a one-off value cannot hide among hundreds of consistent ones.
//
// The style guide fixes a small vocabulary — seven type sizes, three weights,
// five cell paddings, a named spacing rhythm, a closed colour palette. Nothing
// enforced it. This does: each family below carries the documented allowlist,
// and anything outside it is reported with the files that use it, so it either
// gets fixed or gets written down as a deliberate exception.
//
// Usage: node scripts/audit-styles.mjs [--verbose]

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const VERBOSE = process.argv.includes("--verbose");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(jsx?|css)$/.test(name) && !/\.test\./.test(name)) out.push(p);
  }
  return out;
}

// Pull class-ish tokens out of every string literal.
//
// This walks the source character by character rather than stripping comments
// with a regex. Two things defeat the regex approach, and both were live here:
//
//   - An apostrophe in prose ("it's the most text-dense object") opens a
//     phantom string that runs to the next apostrophe, harvesting the words
//     between as class names.
//   - `import.meta.glob("./assets/*.{png,...}")` contains `/*` INSIDE a string.
//     A block-comment stripper treats that as a comment opener and eats
//     everything to the next `*/` — 62% of App.jsx, including every className
//     on the masthead and footer bands, which is why `border-4` and `border-y-4`
//     silently vanished from this report.
//
// A scanner that knows whether it is inside a string, a line comment or a block
// comment gets both right, and is the only way to be sure the audit sees the
// whole file.
function extractStrings(src) {
  const out = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const next = src[i + 1];
    if (c === "/" && next === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (c === "/" && next === "*") {
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++;
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      i++;
      let buf = "";
      while (i < n) {
        if (src[i] === "\\") {
          buf += src[i + 1] ?? "";
          i += 2;
          continue;
        }
        if (src[i] === quote) break;
        buf += src[i];
        i++;
      }
      i++;
      out.push(buf);
      continue;
    }
    i++;
  }
  return out;
}

const files = walk("src");
const uses = new Map(); // class -> Set(file)
for (const file of files) {
  if (file.endsWith(".css")) continue;
  const src = readFileSync(file, "utf8");
  for (const literal of extractStrings(src)) {
    for (const tok of literal.split(/[\s${}]+/)) {
      if (!tok || tok.length > 60) continue;
      // Variant prefixes (`md:`, `hover:`, `focus-visible:`, `group-hover:`,
      // and arbitrary ones like `[@media(hover:hover)]:`) must be allowed
      // through here, not just tolerated by strip() later. Requiring the token
      // to start with a bare utility name rejected every `md:`-prefixed class
      // outright — which hid the entire responsive tier from this audit,
      // including `md:border-4` on the masthead and footer bands.
      if (
        !/^(?:[a-z0-9@[\]()<>=:.,%-]+:)*-?[a-z][a-z0-9]*(-[a-z0-9./[\]()#%,:_-]+)*$/i.test(
          tok,
        )
      )
        continue;
      if (
        !/-|^(flex|grid|block|hidden|italic|truncate|relative|absolute|fixed|static|group|contents|underline|border|rounded|uppercase)$/.test(
          tok,
        )
      )
        continue;
      if (!uses.has(tok)) uses.set(tok, new Set());
      uses.get(tok).add(file.replace("src/", ""));
    }
  }
}

// Strip responsive / state prefixes down to the base utility. The leading "-"
// is deliberately KEPT: `-mx-4` (cancelling a parent's padding to full-bleed a
// child) is a different thing from `mx-4` (indenting one), and collapsing them
// let three negative margins pass as positive ones already on the allowlist.
const strip = (c) => c.replace(/^(?:[a-z-]+:)+/i, "");

const FAMILIES = [
  {
    name: "Type size",
    test: (c) => /^text-(xs|sm|base|lg|[a-z0-9]*xl|wordmark-fluid)$/.test(c),
    allow: [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-5xl",
      "text-wordmark-fluid",
    ],
    note: "seven roles, text-2xl for handwriting, wordmark-fluid per deviation 1",
  },
  {
    name: "Font weight",
    test: (c) =>
      /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/.test(
        c,
      ),
    allow: ["font-normal", "font-semibold", "font-bold"],
    note: "font-medium is off-scale by rule",
  },
  {
    name: "Font family",
    test: (c) => /^font-(sans|display|wordmark|hand|mono)$/.test(c),
    allow: [
      "font-sans",
      "font-display",
      "font-wordmark",
      "font-hand",
      "font-mono",
    ],
  },
  {
    name: "Padding (all sides)",
    test: (c) => /^-?p-[0-9.]+$/.test(c),
    allow: ["p-0", "p-2", "p-3", "p-4", "p-6"],
    note: "cell-padding scale; no p-8",
  },
  {
    name: "Padding (axis/side)",
    test: (c) => /^-?p[xytrbl]-[0-9.]+$/.test(c),
    allow: [
      "px-2",
      "px-3",
      "px-4",
      "py-0.5",
      "py-1",
      "py-2.5",
      "py-3",
      "py-6",
      "py-8",
      "pb-2",
      "pb-2.5",
      "pb-4",
      "pb-5",
      "pt-1",
      "pt-2",
      "pt-6",
      "pl-3",
      "pl-5",
      "pl-6",
      "pr-1",
      "pr-5",
      "pb-1",
      "pb-1.5",
      "pt-3.5",
      "px-6",
      // Accent-underline hug: a `border-b-2` sitting tight under its label.
      // `pb-1` under a Title (SectionTitle), `pb-0.5` under the smaller
      // labels — the nav link and the Colophon's group headers.
      "pb-0.5",
      // The 24px "large separation" step (the mt-6 value) expressed as bottom
      // padding, because it belongs to the timeline entry rather than to the
      // gap between entries — the trailing Pending card must not inherit it.
      "pb-6",
      // Compact masthead: the banner is deliberately asymmetric, pt-4 over
      // pb-1, which is the "trimmed top padding" the Layout section calls for.
      "pt-4",
      // The masthead band's desktop inset is wider than the footer's px-6, and
      // that is deliberate: the banner's content is a centred cluster flanked
      // by two `flex-1` hairlines, so the extra inset shortens those rules and
      // they read as flanking the mark rather than spanning the whole band.
      // The footer is a space-between row, where the inset is a content margin.
      "px-8",
      // The work timeline's rail geometry: the indent from the spine, paired
      // with the badge's `-ml-14` hang and the list's `ml-8`. Desktop only —
      // below md the rail is dropped entirely.
      "pl-8",
      // An 8px indent on the passport's handwritten signature so it does not
      // start flush against the cell edge. Optical placement of handwriting.
      "pl-2",
      // Skip-link chip padding. `px-3 py-1` (LabelTag's chip padding) would
      // render it ~40px tall, under the 44px floor this control is held to as
      // primary navigation; `py-2` clears it at 48px.
      "py-2",
    ],
    note: "cell scale + documented per-widget and per-role exceptions",
  },
  {
    name: "Gap",
    test: (c) => /^-?gap(-[xy])?-[0-9.]+$/.test(c),
    allow: [
      "gap-0.5",
      "gap-1",
      "gap-1.5",
      "gap-2",
      "gap-3",
      "gap-4",
      "gap-5",
      "gap-8",
      "gap-x-4",
      "gap-x-6",
      "gap-y-2",
      "gap-y-4",
    ],
  },
  {
    name: "Margin-top rhythm",
    test: (c) => /^-?mt-[0-9.]+$/.test(c),
    allow: ["mt-0.5", "mt-1", "mt-2", "mt-4", "mt-5", "mt-6"],
    note: "mt-3 is retired",
  },
  {
    name: "Other margins",
    test: (c) => /^-?m[xyrbl]?-[0-9.]+$/.test(c) && !/^-?mt-/.test(c),
    allow: [
      "mx-auto",
      "mb-0",
      "mb-2",
      "mr-0",
      "mr-4",
      "ml-8",
      "-ml-14",
      "-mx-3",
      "my-0",
      // Banner optical alignment. A 2px hairline, two 6px dots and the duo
      // image have to sit on one optical baseline, and none of their boxes
      // agree — these are the nudges that align them, not content spacing.
      "mb-1",
      "mb-0.5",
      "-mb-0.5",
      // Pin's highlight: places a 4px dot inside a 16px circle. Positioning a
      // decorative sub-element, not spacing between content.
      "ml-0.5",
      // Full-bleed inside a padded card: these cancel the Weather postcard's
      // own `p-4` so the skyline runs edge to edge, paired with
      // `w-[calc(100%+2rem)]`. The negative margin IS the idiom.
      "-mx-4",
      "-mb-4",
      // Weather's glyph, pulled left to sit optically centred against the
      // temperature rather than box-centred.
      "-ml-6",
      // A reset, not a spacing value: cancels `mx-auto` once the desktop tier
      // takes over and the column stops being centred on a narrow cap.
      "mx-0",
    ],
    note: "content rhythm, plus optical nudges for decorative sub-elements",
  },
  {
    name: "Text colour",
    // Anchored alternatives ($) so `text-lg` isn't mistaken for a colour by the
    // unanchored `sm` / `base` branches, and so size utilities driven by a
    // custom token (text-wordmark-fluid) fall to the size family instead.
    test: (c) =>
      /^text-(?!xs$|sm$|base$|lg$|[a-z0-9]*xl$|wordmark-fluid$|left$|right$|center$|justify$|ellipsis|clip|wrap|nowrap)[a-z]/.test(
        c,
      ),
    allow: [
      "text-ink",
      "text-label",
      "text-on-ink",
      "text-on-ink-muted",
      "text-gray-600",
      "text-gray-700",
      "text-white",
      "text-transparent",
      "text-spotify",
      "text-center",
      "text-right",
      "text-left",
    ],
    note: "no gray-500 on panels; accents never as text",
  },
  {
    name: "Background",
    test: (c) => /^bg-/.test(c),
    allow: [
      "bg-ink",
      "bg-white",
      "bg-paper",
      "bg-primary",
      "bg-primary-soft",
      "bg-rose",
      "bg-rose-soft",
      "bg-violet",
      "bg-violet-soft",
      "bg-blue",
      "bg-blue-soft",
      "bg-orchid",
      "bg-orchid-soft",
      "bg-live",
      "bg-cover",
      "bg-center",
      "bg-no-repeat",
    ],
  },
  {
    name: "Border width",
    test: (c) => /^border(-[xytrbl])?(-[0-9]+)?$/.test(c),
    allow: [
      "border",
      "border-2",
      "border-4",
      "border-b",
      "border-b-2",
      "border-b-4",
      "border-t",
      "border-t-2",
      "border-y-2",
      "border-y-4",
      "border-x-0",
      "border-l-2",
      "border-r-2",
      "border-t-0",
      "border-0",
    ],
  },
  {
    name: "Border colour",
    test: (c) =>
      /^border-(ink|label|kraft|live|rose|violet|blue|orchid|transparent|on-ink|dashed|white)/.test(
        c,
      ),
    allow: [
      "border-ink",
      "border-label",
      "border-kraft",
      "border-live",
      "border-rose",
      "border-violet",
      "border-blue",
      "border-orchid",
      "border-transparent",
      "border-on-ink",
      "border-dashed",
    ],
  },
  {
    name: "Border radius",
    test: (c) => /^rounded/.test(c),
    allow: ["rounded-full"],
    note: "square corners; only round non-rectangular accents",
  },
  {
    name: "Shadow",
    test: (c) => /^shadow/.test(c),
    allow: ["shadow-sticker", "shadow-none"],
    note: "shadow-sticker is the only shadow",
  },
];

const seen = new Set();
let problems = 0;

for (const fam of FAMILIES) {
  const hits = new Map();
  for (const [cls, filesUsing] of uses) {
    const base = strip(cls);
    if (!fam.test(base)) continue;
    seen.add(cls);
    if (!hits.has(base)) hits.set(base, new Set());
    for (const f of filesUsing) hits.get(base).add(f);
  }
  if (!hits.size) continue;
  const offScale = [...hits.keys()]
    .filter((k) => !fam.allow.includes(k))
    .sort();
  const onScale = [...hits.keys()].filter((k) => fam.allow.includes(k)).sort();

  const status = offScale.length
    ? `${offScale.length} OFF-SCALE`
    : "all on-scale";
  console.log(
    `\n${fam.name} — ${hits.size} distinct, ${status}${fam.note ? `  (${fam.note})` : ""}`,
  );
  if (VERBOSE && onScale.length)
    console.log(`    on-scale: ${onScale.join(" ")}`);
  for (const k of offScale) {
    problems++;
    console.log(`    ✗ ${k.padEnd(22)} ${[...hits.get(k)].sort().join(", ")}`);
  }
}

console.log(
  `\n${problems === 0 ? "  every utility is on the documented scale" : `  ${problems} off-scale value(s) — fix, or add to the allowlist with a reason`}`,
);
process.exit(problems === 0 ? 0 : 1);
