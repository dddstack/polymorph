import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [solid()],
  resolve: {
    conditions: ["development", "browser"]
  },
  test: {
    environment: "jsdom",
    globals: true,
    passWithNoTests: true,
    setupFiles: ["../../node_modules/@testing-library/jest-dom"]
  }
});

export default config;
