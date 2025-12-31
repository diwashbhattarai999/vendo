import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*.tsx", "src/**/*.ts", "src/styles/globals.css"],
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom"],
	tsconfig: "./tsconfig.json",
	outDir: "dist",
});
