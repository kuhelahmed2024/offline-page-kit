export function offlineHtmlTemplate(title = "You're Offline") {
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
    <h1>⚡ You’re Offline</h1>
    <p>No internet connection detected. You can retry, or go back to the homepage (if cached).</p>
    <div class="row">
      <button onclick="location.reload()">Retry</button>
      <a href="/">Go Home</a>
    </div>
  </div>
</body>
</html>`;
}