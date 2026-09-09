import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", ".wrangler"]),

  // Browser-side: the app and the Worker. workerd's globals are a subset of the
  // browser's for everything used here (fetch, Response, URL, console).
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },

  // Node-side: the build config and the repo scripts. These were previously
  // either linted with browser globals (so `process` was an undefined variable
  // in vite.config.js) or not linted at all — the `**/*.{js,jsx}` pattern above
  // never matched `scripts/*.mjs`, so every script in this repo was invisible
  // to ESLint until it was pointed at them.
  {
    files: ["*.config.js", "scripts/**/*.{js,mjs}"],
    extends: [js.configs.recommended],
    languageOptions: {
      // Both global sets on purpose. These are Node processes, but the bodies
      // passed to `page.evaluate()` are serialised and run inside the page, so
      // `document` and `getComputedStyle` are genuinely in scope there.
      globals: { ...globals.node, ...globals.browser },
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
]);
