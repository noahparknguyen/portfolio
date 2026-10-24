import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // The Cloudflare plugin boots a workerd server the unit tests don't need,
  // which makes them slow and flaky to start.
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.VITEST ? [] : [cloudflare()]),
  ],

  // `node` rather than jsdom: everything tested is pure logic, and layout is
  // measured in a real browser instead (scripts/audit-browser.mjs).
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}", "worker/**/*.test.js"],
  },
});
