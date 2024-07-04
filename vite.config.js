import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownPlugin from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), markdownPlugin.plugin({ mode: ["html"] })],

  assetsInclude: ["**/*.glb"],
});
