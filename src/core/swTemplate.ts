import type { OfflineKitBuildOptions } from "../types";

const js = (v: unknown) => JSON.stringify(v);

export function buildServiceWorkerJS(options: Required<OfflineKitBuildOptions>) {
  const { cacheName, offlinePage, offlineImage } = options;

  return `/* offline-page-kit service worker (minimal) */
const CACHE_NAME = ${js(cacheName)};
const OFFLINE_PAGE = ${js(offlinePage)};
const OFFLINE_IMAGE = ${js(offlineImage)};

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // ✅ Do not let one 404 kill the install
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

  // ✅ Offline fallback only for page navigations
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