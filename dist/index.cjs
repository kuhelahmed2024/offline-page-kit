"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  registerOfflineKit: () => registerOfflineKit
});
module.exports = __toCommonJS(index_exports);

// src/register.ts
function registerOfflineKit(opts = {}) {
  const {
    swUrl = "/sw.js",
    scope = "/",
    debug = false,
    onReady,
    onUpdate,
    onError
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerOfflineKit
});
//# sourceMappingURL=index.cjs.map