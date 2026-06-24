import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/fonts.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// The static prerender (prerender.js) ships full HTML for crawlers and first
// paint. On the client we render fresh rather than hydrate: the app has
// browser-only pieces (the 3D scene, the Bandsintown widget, in-view
// animations) whose markup intentionally differs from the server output, so
// hydration would mismatch. Rendering over the prerendered markup sidesteps
// that entirely while keeping the SEO benefit of the prerendered HTML.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
