#!/usr/bin/env node
// Two repo-consistency checks that nothing else catches:
//
//   1. docs/index.html copies its colour tokens from src/index.css. Nothing
//      else keeps the two in step, so a token changed in one place would leave
//      the generated social image on the old value.
//
//   2. package.json's `allowScripts` pins an exact version per package, so a
//      pin goes stale the moment its dependency updates, and npm only warns.
//      A stale pin silently blocks that package's install script.
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
  // `exports` map need not expose its own package.json, and sharp doesn't, so
  // resolving it that way reports an installed package as missing.
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
