#!/usr/bin/env node
// Lists every Tailwind utility in src/ by the property it controls, so a
// one-off value can't hide among hundreds of consistent ones. Anything outside
// its family's allowlist is reported with the files that use it, to be fixed or
// added here with a reason.
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

// Returns every string literal. It scans character by character rather than
// stripping comments with a regex. Two things here defeat a regex: an
// apostrophe in a comment opens a phantom string, and App.jsx's
// `import.meta.glob("./assets/*.{…}")` holds a comment opener inside a string.
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
    // Quotes split too: a template literal's `${…}` keeps the quotes of the
    // strings inside it, and `"py-4"` would fail the class pattern below.
    for (const tok of literal.split(/[\s${}"'`]+/)) {
      if (!tok || tok.length > 60) continue;
      // Variant prefixes (`md:`, `group-hover:`, `[@media(hover:hover)]:`)
      // have to pass here, or every responsive class would go unchecked.
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

// Strips variant prefixes. The leading "-" stays, since `-mx-4` cancels a
// parent's padding and `mx-4` indents: different values, checked apart.
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
    note: "seven roles, text-2xl for handwriting, and the fluid wordmark",
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
      // An underline hugging a small label: the nav link and the Colophon's
      // group headers.
      "pb-0.5",
      // The masthead's asymmetric padding, pt-4 over pb-1.
      "pt-4",
      // The masthead's wider desktop inset, which shortens the hairlines
      // flanking the mark.
      "px-8",
      // Indents the passport's handwritten signature off the cell edge.
      "pl-2",
      // <main>'s edges in App.jsx. With the column's 16px gap, a board page
      // sits 20px from the masthead and footer (py-1) and the others 32px.
      "py-4",
      // The skip link: `py-1` would make it about 40px tall, under the 44px
      // it's held to as primary navigation.
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
    note: "no mt-3",
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
      "-mx-3",
      "my-0",
      // Optical nudges that put the masthead's hairlines, dots, and duo on
      // one baseline.
      "mb-1",
      "mb-0.5",
      "-mb-0.5",
      // Places Pin's highlight dot inside its circle.
      "ml-0.5",
      // Cancel the Weather postcard's `p-4`, so the skyline runs edge to edge.
      "-mx-4",
      "-mb-4",
      // Weather's glyph, pulled left to look centred against the temperature.
      "-ml-6",
      // Cancels a tech stamp's `p-2`, so Spring Boot and PostgreSQL fit on
      // one line.
      "-mx-2",
      // Cancels `mx-auto` once the desktop tier stops centring the column.
      "mx-0",
    ],
    note: "content rhythm, plus optical nudges for decorative sub-elements",
  },
  {
    name: "Text colour",
    // Anchored, so sizes like `text-lg` and `text-wordmark-fluid` fall to the
    // size family. Alignment and wrapping utilities aren't colours either.
    test: (c) =>
      /^text-(?!xs$|sm$|base$|lg$|[a-z0-9]*xl$|wordmark-fluid$|left$|right$|center$|justify$|ellipsis|clip|wrap|nowrap|balance$)[a-z]/.test(
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
