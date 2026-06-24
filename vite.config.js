import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdownPlugin from "vite-plugin-markdown";
import path from "path";
import serveStatic from "serve-static";

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
  server: {
    port: 4200, // Set the port you want/ or available port
    host: true, // listen on all network interfaces (LAN access from phone, etc.)
  },
  assetsInclude: ["**/*.glb"],
  // For the SSR/prerender build: bundle these CommonJS deps instead of
  // externalizing them, so Node's ESM loader doesn't choke on their named
  // exports during prerender.
  ssr: {
    noExternal: [
      "react-helmet-async",
      "yup",
      "property-expr",
      "tiny-case",
      "toposort",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
