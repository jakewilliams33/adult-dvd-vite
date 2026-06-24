// Static prerender step. Runs after `vite build` (client) and
// `vite build --ssr` (server). For each route it renders the real React tree
// to HTML and writes dist/<route>/index.html, so crawlers get full markup
// instead of an empty SPA shell. The client then hydrates it (see main.jsx).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(resolve("dist/index.html"), "utf-8");
const { render } = await import("./dist-server/entry-server.js");

// Static routes only. Dynamic (/listen/:id) and the 404 catch-all are left to
// client-side rendering.
const routes = ["/", "/tour", "/music", "/contact", "/streaming_links"];

for (const url of routes) {
  const { html, helmet } = render(url);

  let page = template.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );

  // Per-route <title> and any page <meta> from react-helmet.
  if (helmet?.title) {
    const title = helmet.title.toString();
    if (title) page = page.replace(/<title>.*?<\/title>/, title);
  }
  if (helmet?.meta) {
    const meta = helmet.meta.toString();
    if (meta) page = page.replace("</head>", `${meta}</head>`);
  }

  const filePath =
    url === "/" ? "dist/index.html" : `dist${url}/index.html`;
  fs.mkdirSync(path.dirname(resolve(filePath)), { recursive: true });
  fs.writeFileSync(resolve(filePath), page);
  console.log("prerendered", filePath);
}

// The server bundle is only needed during this step; don't ship it.
fs.rmSync(resolve("dist-server"), { recursive: true, force: true });
