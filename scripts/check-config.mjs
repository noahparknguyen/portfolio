#!/usr/bin/env node
// docs/index.html copies its colour tokens from src/index.css, and nothing else
// keeps the two in step. A token changed in one place would leave the social
// image on the old value, so any drift fails CI.

import { readFileSync } from "node:fs";

const problems = [];
const notes = [];

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

for (const n of notes) console.log(`  ok  ${n}`);
if (problems.length) {
  console.error(`\n  ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗  ${p}`);
  process.exit(1);
}
console.log("\n  config is consistent");
