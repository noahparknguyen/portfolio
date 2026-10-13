import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  // The Cloudflare plugin boots a workerd dev server, which the unit tests have
  // no use for and which makes them slow and flaky to start. It's the only
  // plugin excluded under test: React and Tailwind stay, so a component test
  // could be added later without changing this.
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.VITEST ? [] : [cloudflare()]),
  ],

  // Vitest reads its config from here. `node` rather than jsdom is deliberate:
  // everything tested is pure logic, and what a DOM could tell us (layout,
  // overflow, contrast, focus order) is measured in a real headless browser
  // instead, where the answers are true.
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}", "worker/**/*.test.js"],
  },
});
