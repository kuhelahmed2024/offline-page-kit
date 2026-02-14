#!/usr/bin/env node

// src/cli.ts
import path2 from "path";

// src/core/utils.ts
import fs from "fs";
import path from "path";
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function writeFileSafe(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}
function exists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}
function parseArgs(argv) {
  const m = /* @__PURE__ */ new Map();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    m.set(key, value);
  }
  return m;
}
function splitList(v) {
  return (v || "").split(",").map((s) => s.trim()).filter(Boolean);
}

// src/core/offlineHtml.ts
function offlineHtmlTemplate(title = "You're Offline") {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title}</title>
  <style>
    body{margin:0;height:100vh;display:grid;place-items:center;font-family:system-ui,-apple-system,Segoe UI,Roboto;background:#0b0f19;color:#fff}
    .box{max-width:560px;padding:28px 26px;border-radius:18px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04)}
    h1{margin:0 0 10px;font-size:28px}
    p{margin:0 0 18px;opacity:.85;line-height:1.5}
    .row{display:flex;gap:10px;flex-wrap:wrap}
    button,a{appearance:none;border:0;border-radius:12px;padding:10px 14px;cursor:pointer;text-decoration:none}
    button{background:#fff;color:#111}
    a{background:rgba(255,255,255,.1);color:#fff}
  </style>
</head>
<body>
  <div class="box">
    <h1>\u26A1 You\u2019re Offline</h1>
    <p>No internet connection detected. You can retry, or go back to the homepage (if cached).</p>
    <div class="row">
      <button onclick="location.reload()">Retry</button>
      <a href="/">Go Home</a>
    </div>
  </div>
</body>
</html>`;
}

// src/core/offlineSvg.ts
function offlineSvgTemplate() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0b0f19"/>
  <text x="80" y="220" fill="#ffffff" font-size="64" font-family="system-ui, -apple-system, Segoe UI, Roboto">You\u2019re Offline</text>
  <text x="80" y="300" fill="#cbd5e1" font-size="28" font-family="system-ui, -apple-system, Segoe UI, Roboto">Please check your connection and try again.</text>
  <circle cx="1040" cy="220" r="90" fill="rgba(255,255,255,0.08)"/>
  <path d="M980 220c40-40 120-40 160 0" stroke="#fff" stroke-width="10" fill="none" opacity="0.6"/>
  <path d="M1010 250c25-25 75-25 100 0" stroke="#fff" stroke-width="10" fill="none" opacity="0.6"/>
  <circle cx="1060" cy="290" r="10" fill="#fff" opacity="0.7"/>
</svg>`;
}

// src/core/swTemplate.ts
var js = (v) => JSON.stringify(v);
function buildServiceWorkerJS(options2) {
  const { cacheName, offlinePage, offlineImage } = options2;
  return `/* offline-page-kit service worker (minimal) */
const CACHE_NAME = ${js(cacheName)};
const OFFLINE_PAGE = ${js(offlinePage)};
const OFFLINE_IMAGE = ${js(offlineImage)};

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // \u2705 Do not let one 404 kill the install
    await Promise.allSettled([
      cache.add(OFFLINE_PAGE),
      cache.add(OFFLINE_IMAGE),
    ]);

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // \u2705 Offline fallback only for page navigations
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(OFFLINE_PAGE)) || new Response("Offline", { status: 503 });
      }
    })());
  }
});
`;
}

// src/cli.ts
function normalizePublicPath(p) {
  if (!p.startsWith("/")) return "/" + p;
  return p;
}
function withDefaults(o) {
  return {
    outDir: o.outDir ?? "public",
    swFileName: o.swFileName ?? "sw.js",
    offlinePage: normalizePublicPath(o.offlinePage ?? "/offline.html"),
    offlineImage: normalizePublicPath(o.offlineImage ?? "/offline.svg"),
    cacheName: o.cacheName ?? "offline-page-kit",
    precache: o.precache ?? [],
    htmlStrategy: o.htmlStrategy ?? "networkFirst",
    assetStrategy: o.assetStrategy ?? "staleWhileRevalidate",
    imageStrategy: o.imageStrategy ?? "cacheFirst",
    assetExtensions: o.assetExtensions ?? [],
    apiPrefixes: o.apiPrefixes ?? []
  };
}
var args = parseArgs(process.argv.slice(2));
var cmd = process.argv.slice(2).find((a) => !a.startsWith("--")) || "init";
var outDir = path2.resolve(process.cwd(), args.get("outDir") || "public");
var options = withDefaults({
  outDir,
  swFileName: args.get("swFileName") || "sw.js",
  offlinePage: args.get("offlinePage") || "/offline.html",
  offlineImage: args.get("offlineImage") || "/offline.svg",
  cacheName: args.get("cacheName") || "offline-page-kit",
  precache: splitList(args.get("precache")),
  htmlStrategy: args.get("htmlStrategy") || "networkFirst",
  assetStrategy: args.get("assetStrategy") || "staleWhileRevalidate",
  imageStrategy: args.get("imageStrategy") || "cacheFirst",
  assetExtensions: splitList(args.get("assetExtensions")),
  apiPrefixes: splitList(args.get("apiPrefixes"))
});
var swOut = path2.join(outDir, options.swFileName);
var offlineHtmlOut = path2.join(outDir, options.offlinePage.replace(/^\//, ""));
var offlineSvgOut = path2.join(outDir, options.offlineImage.replace(/^\//, ""));
if (cmd === "init" || cmd === "build") {
  if (cmd === "build" || !exists(offlineHtmlOut)) {
    writeFileSafe(offlineHtmlOut, offlineHtmlTemplate());
  }
  if (cmd === "build" || !exists(offlineSvgOut)) {
    writeFileSafe(offlineSvgOut, offlineSvgTemplate());
  }
  const sw = buildServiceWorkerJS(options);
  writeFileSafe(swOut, sw);
  console.log(`[offline-page-kit] Generated:
- ${swOut}
- ${offlineHtmlOut}
- ${offlineSvgOut}
`);
} else {
  console.log(`[offline-page-kit] Unknown command: ${cmd}
Use:
  offline-page-kit init --outDir public
  offline-page-kit build --outDir public
`);
}
//# sourceMappingURL=cli.js.map