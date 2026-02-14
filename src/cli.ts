#!/usr/bin/env node
import path from "node:path";
import { parseArgs, splitList, writeFileSafe, exists } from "./core/utils";
import { offlineHtmlTemplate } from "./core/offlineHtml";
import { offlineSvgTemplate } from "./core/offlineSvg";
import { buildServiceWorkerJS } from "./core/swTemplate";
import type { OfflineKitBuildOptions } from "./types";

function normalizePublicPath(p: string) {
    if (!p.startsWith("/")) return "/" + p;
    return p;
}

function withDefaults(o: OfflineKitBuildOptions): Required<OfflineKitBuildOptions> {
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
        apiPrefixes: o.apiPrefixes ?? [],
    };
}

const args = parseArgs(process.argv.slice(2));
const cmd = process.argv.slice(2).find(a => !a.startsWith("--")) || "init";

const outDir = path.resolve(process.cwd(), args.get("outDir") || "public");

const options = withDefaults({
    outDir,
    swFileName: args.get("swFileName") || "sw.js",
    offlinePage: args.get("offlinePage") || "/offline.html",
    offlineImage: args.get("offlineImage") || "/offline.svg",
    cacheName: args.get("cacheName") || "offline-page-kit",
    precache: splitList(args.get("precache")),
    htmlStrategy: (args.get("htmlStrategy") as any) || "networkFirst",
    assetStrategy: (args.get("assetStrategy") as any) || "staleWhileRevalidate",
    imageStrategy: (args.get("imageStrategy") as any) || "cacheFirst",
    assetExtensions: splitList(args.get("assetExtensions")),
    apiPrefixes: splitList(args.get("apiPrefixes")),
} as OfflineKitBuildOptions);

const swOut = path.join(outDir, options.swFileName);
const offlineHtmlOut = path.join(outDir, options.offlinePage.replace(/^\//, ""));
const offlineSvgOut = path.join(outDir, options.offlineImage.replace(/^\//, ""));

if (cmd === "init" || cmd === "build") {
    // generate offline page if missing OR force (when build)
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