import { solidPlugin } from "esbuild-plugin-solid";
import { defineConfig } from "tsup";

const config = defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.tsx"],
  esbuildPlugins: [solidPlugin()],
  format: ["esm"],
  minify: true,
  sourcemap: true,
  treeshake: true
});

export default config;
