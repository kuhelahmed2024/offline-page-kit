
import type { OfflineKitRegisterOptions } from "./types";

export function registerOfflineKit(opts: OfflineKitRegisterOptions = {}) {
    const {
        swUrl = "/sw.js",
        scope = "/",
        debug = false,
        onReady,
        onUpdate,
        onError,
    } = opts;

    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) {
        debug && console.warn("[offline-kit] Service Worker not supported");
        return;
    }

    window.addEventListener("load", async () => {
        try {
            const reg = await navigator.serviceWorker.register(swUrl, { scope });
            debug && console.log("[offline-kit] registered:", { swUrl, scope });

            onReady?.(reg);

            reg.addEventListener("updatefound", () => {
                const installing = reg.installing;
                if (!installing) return;

                installing.addEventListener("statechange", () => {
                    if (installing.state !== "installed") return;

                    if (navigator.serviceWorker.controller) {
                        debug && console.log("[offline-kit] update available");
                        onUpdate?.(reg);
                    } else {
                        debug && console.log("[offline-kit] first install complete");
                    }
                });
            });
        } catch (err) {
            debug && console.error("[offline-kit] register failed:", err);
            onError?.(err);
        }
    });
}