#!/usr/bin/env node
// Two repo-consistency checks that nothing else can catch, both of which have
// already gone wrong here once:
//
//   1. docs/index.html claims its colour tokens are "copied verbatim from
//      src/index.css". --color-label sat at the pre-fix #625AA0 there long after
//      the real token was darkened to #5A5393 to clear AA, and the comment went
//      on claiming otherwise. A generated OG image would have carried the old
//      value.
//
//   2. package.json's `allowScripts` pins an EXACT version per package, so it
//      goes stale the moment a dependency bumps — and npm only warns. Both
//      workerd and sharp had their install scripts silently blocked because the
//      pins still named older versions.
//
// Exits non-zero on any failure so CI fails rather than warns.

import { readFileSync, existsSync } from "node:fs";

const problems = [];
const notes = [];

// ---------------------------------------------------------------- 1. tokens
const CSS = readFileSync("src/index.css", "utf8");
const DOC = readFileSync("docs/index.html", "utf8");

const tokensIn = (src) => {
  const found = new Map();
  for (const m of src.matchAll(
    /(--color-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})/g,
  )) {
    found.set(m[1], m[2].toLowerCase());
  }
  return found;
};

const cssTokens = tokensIn(CSS);
const docTokens = tokensIn(DOC);

let compared = 0;
for (const [name, docValue] of docTokens) {
  const cssValue = cssTokens.get(name);
  if (cssValue === undefined) {
    problems.push(
      `docs/index.html defines ${name}: ${docValue}, which no longer exists in src/index.css`,
    );
    continue;
  }
  compared++;
  if (cssValue !== docValue) {
    problems.push(
      `token drift: ${name} is ${cssValue} in src/index.css but ${docValue} in docs/index.html`,
    );
  }
}
notes.push(`compared ${compared} colour tokens shared with docs/index.html`);

// ------------------------------------------------------- 2. allowScripts pins
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const pins = pkg.allowScripts ?? {};
let checked = 0;
for (const key of Object.keys(pins)) {
  const at = key.lastIndexOf("@");
  const name = key.slice(0, at);
  const pinned = key.slice(at + 1);
  // Read the manifest off disk rather than through `require`: a package with an
  // `exports` map need not expose its own package.json, and sharp does not —
  // resolving it that way reported an installed package as missing.
  const manifest = `node_modules/${name}/package.json`;
  if (!existsSync(manifest)) {
    problems.push(
      `allowScripts pins ${key}, but ${name} is not installed — the pin is dead`,
    );
    continue;
  }
  const installed = JSON.parse(readFileSync(manifest, "utf8")).version;
  checked++;
  if (installed !== pinned) {
    problems.push(
      `allowScripts pins ${name}@${pinned} but ${installed} is installed — ` +
        `its install script is being blocked. Update the pin to ${name}@${installed}.`,
    );
  }
}
notes.push(`checked ${checked} allowScripts pins against installed versions`);

// ------------------------------------------------------------------- report
for (const n of notes) console.log(`  ok  ${n}`);
if (problems.length) {
  console.error(`\n  ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗  ${p}`);
  process.exit(1);
}
console.log("\n  config is consistent");
