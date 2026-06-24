import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

// Render a single route to an HTML string at build time (used by prerender.js).
// Mirrors the client tree in main.jsx, but with StaticRouter instead of
// BrowserRouter so it runs in Node with no browser APIs.
export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>,
  );
  return { html, helmet: helmetContext.helmet };
}
