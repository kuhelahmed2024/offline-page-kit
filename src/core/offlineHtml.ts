export function offlineHtmlTemplate(title = "You're Offline") {
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
          <h1 id="offline-title">😵‍💫 You’re Offline</h1>
          <p>
            No internet connection detected. Don’t worry — you can retry now,
            or go home if it’s already cached. ✨
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
            Tip: Your cached pages may still open ⚡
          </p>
          <p style="margin:0;color:rgba(255,255,255,.62)">
            We’ll auto-refresh when you’re back online ✅
          </p>
        </div>
      </div>

      <div class="actions">
        <button class="btn primary" id="retryBtn" type="button">
          🔄 Retry
        </button>
        <a class="btn ghost" href="/" rel="noopener">
          🏠 Go Home
        </a>
        <button class="btn ghost" id="copyBtn" type="button" title="Copy current URL">
          🔗 Copy URL
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
    <span id="toastText">Back online — reloading…</span>
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
        showToast("✅ Back online — reloading…");
        setTimeout(() => location.reload(), 650);
      }
    }

    retryBtn.addEventListener("click", () => location.reload());

    copyBtn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(location.href);
        showToast("📋 URL copied!");
      }catch{
        // fallback
        const ta = document.createElement("textarea");
        ta.value = location.href;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        showToast("📋 URL copied!");
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