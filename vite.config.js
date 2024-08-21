import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownPlugin from "vite-plugin-markdown";
import path from "path";
import serveStatic from "serve-static";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    markdownPlugin.plugin({ mode: ["html"] }),
    {
      name: "serve-admin",
      configureServer(server) {
        // Serve the admin index.html
        server.middlewares.use(
          "/admin",
          serveStatic(path.resolve(__dirname, "public/admin"))
        );

        // Serve other static files
        server.middlewares.use(serveStatic(path.resolve(__dirname, "public")));
      },
    },
  ],
  assetsInclude: ["**/*.glb"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
