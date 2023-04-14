import { qwikVite } from "@builder.io/qwik/optimizer";
import { defineConfig } from "vitest/config";

const config = defineConfig({
  plugins: [qwikVite()],
  test: {
    globals: true,
    passWithNoTests: true
  }
});

export default config;
