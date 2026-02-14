export type Strategy = "networkFirst" | "cacheFirst" | "staleWhileRevalidate";

export type OfflineKitRegisterOptions = {
    swUrl?: string;         // default "/sw.js"
    scope?: string;         // default "/"
    debug?: boolean;

    onReady?: (reg: ServiceWorkerRegistration) => void;
    onUpdate?: (reg: ServiceWorkerRegistration) => void;
    onError?: (err: unknown) => void;
};

export type OfflineKitBuildOptions = {
    outDir?: string;        // default "public"
    swFileName?: string;    // default "sw.js"

    offlinePage?: string;   // default "/offline.html"
    offlineImage?: string;  // default "/offline.svg" (generated if not exists)

    cacheName?: string;     // default "offline-page-kit"
    precache?: string[];    // extra assets to precache (e.g. ["/favicon.ico"])

    // rules (simple + effective)
    htmlStrategy?: Strategy;     // default "networkFirst"
    assetStrategy?: Strategy;    // default "staleWhileRevalidate"
    imageStrategy?: Strategy;    // default "cacheFirst"

    // matchers
    assetExtensions?: string[];  // default common: js,css,woff2,png,...
    apiPrefixes?: string[];      // default [] (e.g. ["/api", "https://api.x.com"])
};