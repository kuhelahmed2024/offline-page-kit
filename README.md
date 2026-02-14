<!-- =============================================== -->
<!-- 🔥 Animated SVG Header Banner -->
<!-- =============================================== -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=ff7a00&height=200&section=header&text=offline-page-kit&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38" />
</p>

<p align="center">
  <b>Framework-agnostic Offline Fallback System</b><br/>
  Lightweight • Deterministic • Production-Safe
</p>

---

<!-- =============================================== -->
<!-- 🌐 Social & Community Links -->
<!-- =============================================== -->

<p align="center">
  🌍 <b>Website:</b> <a href="https://devcrack.dev">devcrack.dev</a> &nbsp; | &nbsp;
  ▶️ <b>YouTube:</b> <a href="https://www.youtube.com/@dev-crack">DevCrack Channel</a><br/>
  🔹 <b>Facebook:</b> <a href="https://web.facebook.com/profile.php?id=61573018852861">Profile</a> &nbsp; | &nbsp;
  🔹 <b>Community Group:</b> <a href="https://web.facebook.com/groups/1672263410026163">Join Community</a>
</p>

---

<!-- =============================================== -->
<!-- 🟢 NPM + CI + Coverage Badges -->
<!-- =============================================== -->

<p align="center">
  <a href="https://www.npmjs.com/package/offline-page-kit">
    <img src="https://img.shields.io/npm/v/offline-page-kit?style=for-the-badge&color=orange" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/offline-page-kit">
    <img src="https://img.shields.io/npm/dm/offline-page-kit?style=for-the-badge&color=blue" alt="npm downloads">
  </a>
  <a href="https://bundlephobia.com/package/offline-page-kit">
    <img src="https://img.shields.io/bundlephobia/minzip/offline-page-kit?style=for-the-badge&color=purple" alt="bundle size">
  </a>
  <img src="https://img.shields.io/github/actions/workflow/status/kuhelahmed2024/offline-page-kit/ci.yml?style=for-the-badge" alt="CI status">
  <img src="https://img.shields.io/codecov/c/github/kuhelahmed2024/offline-page-kit?style=for-the-badge" alt="coverage">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Ready">
  <img src="https://img.shields.io/badge/Zero-Dependencies-black?style=for-the-badge" alt="Zero Dependencies">
</p>

---

# 📦 offline-page-kit

> Minimal, framework-agnostic Service Worker generator that prevents blank screens during network failure.

---

# 🟡 Professional npm Description

**offline-page-kit** is a lightweight, zero-dependency Service Worker toolkit that provides deterministic offline fallback behavior for modern web applications.

It guarantees that when network connectivity fails, users see a controlled offline experience instead of browser error pages or blank screens.

Designed for production-grade stability across:

- Next.js
- Vite
- React
- Vue
- Static sites
- Any public-folder architecture

No Workbox.  
No complex runtime caching layers.  
No unpredictable asset behavior.

Just reliable navigation fallback.

---

# 🟣 Demo

<p align="center">
  <img src="https://github.com/kuhelahmed2024/offline-page-kit/blob/main/img/example.gif" width="600" alt="demo gif placeholder">
</p>

> Replace this GIF with your own demo showing:
> - Online page load
> - DevTools → Offline mode
> - Refresh → Offline page appears

---

# 🚀 Quick Start

### 1️⃣ Install

```
npm install offline-page-kit
```

### 2️⃣ Generate Service Worker

```
npx offline-page-kit init --outDir public
```

This generates:

```
public/
 ├── sw.js
 ├── offline.html
 └── offline.svg
```

### 3️⃣ Register in Client

```ts
import { registerOfflineKit } from "offline-page-kit";

registerOfflineKit({ debug: true });
```

Done ✅

---

# 🧠 Architecture

```
Browser
   ↓
Service Worker
   ↓
Fetch Navigation Request
   ├─ Network OK  → return live page
   └─ Network FAIL → return cached offline.html
```

Only navigation requests are intercepted.

No API mutation.  
No asset rewriting.  
No hidden caching layers.

---

# 🔄 Lifecycle

```
Install → Activate → Control → Fetch
```

### Install
- Caches offline page + fallback image
- Uses Promise.allSettled() to avoid failure

### Activate
- Immediately claims clients

### Fetch
- Applies network-first
- Falls back to offline page

---

# 🧩 Framework Examples

## Next.js (App Router)

```tsx

// #/app/page.tsx
"use client";

import { useEffect } from "react";
import { registerOfflineKit } from "offline-page-kit";

export default function Home() {
  useEffect(() => {
    registerOfflineKit(
      {
        swUrl: "/sw.js",
        scope: "/",
        debug: true
      }
    );
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">You are Online.</h1>
    </main>
  );
}



```

---

## Vite / React

```ts
import { registerOfflineKit } from "offline-page-kit";

registerOfflineKit();
```

---

# ⚙ Windows PowerShell (VSCode)

```
npx offline-page-kit init `
  --outDir public `
  --offlinePage /offline.html `
  --offlineImage /offline.svg `
  --cacheName my-app-cache-v1
```
---

# 🔹⚙ Windows CMD

```
npx offline-page-kit init ^
  --outDir public ^
  --offlinePage /offline.html ^
  --offlineImage /offline.svg ^
  --cacheName my-app-cache-v1
```
---

# ⚙ Linux/macOS (Bash/Zsh)

```
npx offline-page-kit init \
  --outDir public \
  --offlinePage /offline.html \
  --offlineImage /offline.svg \
  --cacheName my-app-cache-v1
```

| Option | Default | Description |
|--------|---------|------------|
| outDir | public | Static folder |
| offlinePage | /offline.html | Navigation fallback |
| offlineImage | /offline.svg | Fallback asset |
| cacheName | offline-page-kit | Cache namespace |

---

# 🔐 Security

- Requires HTTPS (or localhost)
- Does not cache authenticated APIs
- Does not alter CORS behavior
- Per-origin scoped

---

# ⚡ Performance

- Zero runtime dependencies
- Minimal memory usage
- No background sync
- No bundle overhead

---

# 🧪 Testing

1. Load site
2. Reload once
3. DevTools → Application → Service Workers
4. Enable Offline
5. Refresh

Offline page should render.

---

# 🏢 Production Notes

- Always deploy over HTTPS
- Version cache when updating logic
- Avoid multiple SWs in same scope

---

# 🧭 Roadmap

- Asset caching layer
- API strategy module
- Auto public folder scan
- Cache version hashing
- Metrics integration
- Advanced fallback strategies

---

# 📜 License

MIT

---

<p align="center">
  Built for modern web applications.
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=ff7a00&height=120&section=footer"/>
</p>