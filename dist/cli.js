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
  const norm = (k) => k.replace(/-/g, "").toLowerCase();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const rawKey = a.slice(2);
    const key = norm(rawKey);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    m.set(key, value);
  }
  return {
    get(name) {
      return m.get(norm(name));
    }
  };
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
  <meta name="theme-color" content="#0b0f19"/>

  <style>
    :root{
      --bg0:#060912;
      --bg1:#0b1022;
      --card: rgba(255,255,255,.06);
      --card2: rgba(255,255,255,.04);
      --stroke: rgba(255,255,255,.14);
      --text:#ffffff;
      --muted: rgba(255,255,255,.78);
      --muted2: rgba(255,255,255,.62);
      --good:#2ee59d;
      --warn:#ffd166;
      --shadow: 0 20px 80px rgba(0,0,0,.55);
      --radius: 22px;
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
      color:var(--text);
      background:
        radial-gradient(900px 500px at 18% 18%, rgba(120,140,255,.20), transparent 60%),
        radial-gradient(700px 500px at 82% 20%, rgba(46,229,157,.16), transparent 58%),
        radial-gradient(600px 520px at 50% 95%, rgba(255,209,102,.14), transparent 55%),
        linear-gradient(180deg, var(--bg0), var(--bg1));
      overflow:hidden;
    }

    /* Floating blobs (subtle animation) */
    .blob{
      position:absolute; inset:auto;
      width: 520px; height: 520px;
      border-radius: 50%;
      filter: blur(42px);
      opacity:.35;
      animation: float 10s ease-in-out infinite;
      pointer-events:none;
      transform: translate3d(0,0,0);
    }
    .blob.b1{left:-180px; top:-200px; background: rgba(120,140,255,.55); animation-duration: 12s;}
    .blob.b2{right:-210px; top:-150px; background: rgba(46,229,157,.52); animation-duration: 14s;}
    .blob.b3{left:18%; bottom:-320px; background: rgba(255,209,102,.45); animation-duration: 16s;}

    @keyframes float{
      0%,100%{ transform: translate(0,0) scale(1);}
      50%{ transform: translate(22px,-18px) scale(1.06);}
    }

    /* Main layout */
    .wrap{
      min-height:100%;
      display:grid;
      place-items:center;
      padding: 24px;
      position:relative;
      z-index:1;
    }

    .card{
      width:min(720px, 100%);
      border-radius: var(--radius);
      background: linear-gradient(180deg, var(--card), var(--card2));
      border:1px solid var(--stroke);
      box-shadow: var(--shadow);
      padding: 26px;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      animation: pop .55s cubic-bezier(.2,.9,.2,1) both;
    }

    @keyframes pop{
      from{ opacity:0; transform: translateY(14px) scale(.98); }
      to{ opacity:1; transform: translateY(0) scale(1); }
    }

    .top{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:16px;
      margin-bottom: 14px;
    }

    .badge{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding: 10px 12px;
      border-radius: 999px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.18);
      color: var(--muted);
      font-size: 13px;
      user-select:none;
      white-space:nowrap;
    }

    /* Ping dot */
    .dot{
      width:10px;height:10px;border-radius:50%;
      background: var(--warn);
      box-shadow: 0 0 0 0 rgba(255,209,102,.65);
      animation: ping 1.6s infinite;
    }
    @keyframes ping{
      0%{ box-shadow: 0 0 0 0 rgba(255,209,102,.55); }
      70%{ box-shadow: 0 0 0 10px rgba(255,209,102,0); }
      100%{ box-shadow: 0 0 0 0 rgba(255,209,102,0); }
    }

    h1{
      margin: 0 0 8px;
      font-size: clamp(26px, 3.3vw, 34px);
      letter-spacing: -0.02em;
      line-height: 1.15;
    }

    p{
      margin: 0;
      color: var(--muted2);
      line-height: 1.55;
      font-size: 15.5px;
    }

    .hero{
      display:flex;
      align-items:center;
      gap: 14px;
      margin-top: 10px;
    }

    /* Animated wifi icon */
    .wifi{
      width: 54px; height: 54px;
      border-radius: 16px;
      display:grid; place-items:center;
      background: rgba(255,255,255,.06);
      border:1px solid rgba(255,255,255,.12);
      position:relative;
      overflow:hidden;
    }
    .wifi::after{
      content:"";
      position:absolute; inset:-40%;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.18), transparent 55%);
      animation: sheen 2.8s ease-in-out infinite;
    }
    @keyframes sheen{
      0%,100%{ transform: translate(-8px,-6px) rotate(0deg); opacity:.75;}
      50%{ transform: translate(10px,8px) rotate(8deg); opacity:.9;}
    }

    .wifi svg{ position:relative; z-index:1; opacity:.95; }
    .wifi path{ animation: wave 1.6s ease-in-out infinite; transform-origin:center; }
    .wifi path:nth-child(1){ opacity:.35; animation-delay:.05s;}
    .wifi path:nth-child(2){ opacity:.55; animation-delay:.12s;}
    .wifi path:nth-child(3){ opacity:.75; animation-delay:.2s;}
    .wifi circle{ opacity:.9; animation: blink 1.2s ease-in-out infinite; }

    @keyframes wave{
      0%,100%{ transform: scale(1); }
      50%{ transform: scale(1.06); }
    }
    @keyframes blink{
      0%,100%{ opacity:.9; }
      50%{ opacity:.45; }
    }

    .actions{
      display:flex;
      flex-wrap:wrap;
      gap: 10px;
      margin-top: 18px;
    }

    .btn{
      appearance:none;
      border:0;
      border-radius: 14px;
      padding: 11px 14px;
      cursor:pointer;
      text-decoration:none;
      display:inline-flex;
      align-items:center;
      gap:10px;
      font-weight: 650;
      font-size: 14.5px;
      letter-spacing: .01em;
      transition: transform .12s ease, filter .12s ease, background .2s ease, border-color .2s ease;
      user-select:none;
    }
    .btn:active{ transform: translateY(1px) scale(.99); }

    .primary{
      background: #ffffff;
      color: #0b0f19;
      box-shadow: 0 8px 24px rgba(255,255,255,.12);
    }
    .primary:hover{ filter: brightness(0.98); }

    .ghost{
      background: rgba(255,255,255,.08);
      color: var(--text);
      border: 1px solid rgba(255,255,255,.14);
    }
    .ghost:hover{
      background: rgba(255,255,255,.10);
      border-color: rgba(255,255,255,.18);
    }

    .hint{
      margin-top: 14px;
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
      color: var(--muted2);
      font-size: 13px;
    }

    .kbd{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 9px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(0,0,0,.20);
      color: rgba(255,255,255,.82);
    }

    /* Toast */
    .toast{
      position: fixed;
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%);
      padding: 10px 12px;
      border-radius: 999px;
      background: rgba(0,0,0,.40);
      border:1px solid rgba(255,255,255,.14);
      color: rgba(255,255,255,.86);
      font-size: 13px;
      display:flex;
      gap:10px;
      align-items:center;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 10px 40px rgba(0,0,0,.35);
      opacity:0;
      pointer-events:none;
      transition: opacity .22s ease, transform .22s ease;
    }
    .toast.show{
      opacity:1;
      transform: translateX(-50%) translateY(-2px);
    }
    .toast .okdot{
      width:10px;height:10px;border-radius:50%;
      background: var(--good);
      box-shadow: 0 0 0 6px rgba(46,229,157,.10);
    }

    /* Reduce motion */
    @media (prefers-reduced-motion: reduce){
      .blob, .dot, .wifi path, .wifi circle, .card{ animation:none !important; }
      .toast{ transition:none; }
    }
  </style>
</head>

<body>
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>

  <main class="wrap" role="main">
    <section class="card" aria-labelledby="offline-title">
      <div class="top">
        <div>
          <h1 id="offline-title">\u{1F635}\u200D\u{1F4AB} You\u2019re Offline</h1>
          <p>
            No internet connection detected. Don\u2019t worry \u2014 you can retry now,
            or go home if it\u2019s already cached. \u2728
          </p>
        </div>

        <div class="badge" aria-live="polite">
          <span class="dot" aria-hidden="true"></span>
          <span id="netText">Offline mode</span>
        </div>
      </div>

      <div class="hero">
        <div class="wifi" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M2.5 9.2C8.6 3.2 15.4 3.2 21.5 9.2" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M5.8 12.4C10.1 8.3 13.9 8.3 18.2 12.4" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M9.2 15.7C11.2 13.9 12.8 13.9 14.8 15.7" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <circle cx="12" cy="19" r="1.4" fill="white"/>
          </svg>
        </div>

        <div>
          <p style="margin:0 0 6px;color:rgba(255,255,255,.86);font-weight:650">
            Tip: Your cached pages may still open \u26A1
          </p>
          <p style="margin:0;color:rgba(255,255,255,.62)">
            We\u2019ll auto-refresh when you\u2019re back online \u2705
          </p>
        </div>
      </div>

      <div class="actions">
        <button class="btn primary" id="retryBtn" type="button">
          \u{1F504} Retry
        </button>
        <a class="btn ghost" href="/" rel="noopener">
          \u{1F3E0} Go Home
        </a>
        <button class="btn ghost" id="copyBtn" type="button" title="Copy current URL">
          \u{1F517} Copy URL
        </button>
      </div>

      <div class="hint">
        <span>Quick keys:</span>
        <span class="kbd">R</span> Retry
        <span class="kbd">H</span> Home
      </div>
    </section>
  </main>

  <div class="toast" id="toast" role="status" aria-live="polite">
    <span class="okdot" aria-hidden="true"></span>
    <span id="toastText">Back online \u2014 reloading\u2026</span>
  </div>

  <script>
    const retryBtn = document.getElementById("retryBtn");
    const copyBtn  = document.getElementById("copyBtn");
    const netText  = document.getElementById("netText");
    const toast    = document.getElementById("toast");
    const toastText= document.getElementById("toastText");

    function showToast(msg){
      toastText.textContent = msg;
      toast.classList.add("show");
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
    }

    function updateStatus(){
      const online = navigator.onLine;
      netText.textContent = online ? "Online" : "Offline mode";
      // If it becomes online, reload after tiny delay (feels smoother)
      if (online){
        showToast("\u2705 Back online \u2014 reloading\u2026");
        setTimeout(() => location.reload(), 650);
      }
    }

    retryBtn.addEventListener("click", () => location.reload());

    copyBtn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(location.href);
        showToast("\u{1F4CB} URL copied!");
      }catch{
        // fallback
        const ta = document.createElement("textarea");
        ta.value = location.href;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        showToast("\u{1F4CB} URL copied!");
      }
    });

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      const k = (e.key || "").toLowerCase();
      if (k === "r") location.reload();
      if (k === "h") location.href = "/";
    });

    // initial
    updateStatus();
  </script>
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