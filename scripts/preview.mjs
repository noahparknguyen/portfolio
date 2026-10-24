// What the two browser scripts share: finding Chrome, and serving the
// production build with `vite preview` on a port of their own.

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Returns the first Chrome on the machine, or exits if there's none.
export function findChrome() {
  for (const c of [
    process.env.CHROME_PATH,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ]) {
    if (c && existsSync(c)) return c;
  }
  console.error("  ✗ no Chrome binary found; set CHROME_PATH");
  process.exit(1);
}

// Serves dist/ on `port` and resolves once it answers, with the URL and a
// `stop` that also runs on exit and Ctrl+C. Exits if the server never comes up.
export async function startPreview(port) {
  const base = `http://localhost:${port}`;

  // Refuse a server this script didn't start. Killing the child doesn't
  // reliably take down the whole `npx vite preview` tree, so an interrupted run
  // can leave an orphan holding the port. The next run would then talk to the
  // orphan, whose stale build loads blank pages.
  try {
    const stale = await fetch(base, { signal: AbortSignal.timeout(2000) });
    if (stale.ok) {
      console.error(
        `  ✗ something is already serving ${base}. This script must start its own\n` +
          `    preview so it serves the current build. Stop that process and re-run.`,
      );
      process.exit(1);
    }
  } catch {
    // Nothing there, which is what we want.
  }

  // `detached` puts the child in its own process group, so `stop` can signal
  // the whole tree rather than just the `npx` shim.
  const server = spawn(
    "npx",
    ["vite", "preview", "--port", String(port), "--strictPort"],
    { stdio: "ignore", detached: true },
  );
  const stop = () => {
    try {
      process.kill(-server.pid, "SIGKILL");
    } catch {
      server.kill("SIGKILL");
    }
  };
  process.on("exit", stop);
  process.on("SIGINT", () => {
    stop();
    process.exit(130);
  });

  for (let i = 0; i < 60; i++) {
    await wait(500);
    try {
      if ((await fetch(base)).ok) return { base, stop };
    } catch {
      // Not up yet.
    }
  }
  console.error("  ✗ vite preview did not come up");
  stop();
  process.exit(1);
}
