import preact from "@preact/preset-vite";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [preact()],
  test: {
    environment: "jsdom",
    globals: true,
    passWithNoTests: true
  }
});

export default config;
