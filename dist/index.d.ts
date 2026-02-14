type Strategy = "networkFirst" | "cacheFirst" | "staleWhileRevalidate";
type OfflineKitRegisterOptions = {
    swUrl?: string;
    scope?: string;
    debug?: boolean;
    onReady?: (reg: ServiceWorkerRegistration) => void;
    onUpdate?: (reg: ServiceWorkerRegistration) => void;
    onError?: (err: unknown) => void;
};
type OfflineKitBuildOptions = {
    outDir?: string;
    swFileName?: string;
    offlinePage?: string;
    offlineImage?: string;
    cacheName?: string;
    precache?: string[];
    htmlStrategy?: Strategy;
    assetStrategy?: Strategy;
    imageStrategy?: Strategy;
    assetExtensions?: string[];
    apiPrefixes?: string[];
};

declare function registerOfflineKit(opts?: OfflineKitRegisterOptions): void;

export { type OfflineKitBuildOptions, type OfflineKitRegisterOptions, type Strategy, registerOfflineKit };
