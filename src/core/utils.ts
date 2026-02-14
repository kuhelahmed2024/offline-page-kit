import fs from "node:fs";
import path from "node:path";

export function ensureDir(p: string) {
    fs.mkdirSync(p, { recursive: true });
}

export function writeFileSafe(filePath: string, content: string) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content, "utf8");
}

export function exists(filePath: string) {
    try { fs.accessSync(filePath); return true; } catch { return false; }
}

export function parseArgs(argv: string[]) {
    const m = new Map<string, string>();

    const norm = (k: string) => k.replace(/-/g, "").toLowerCase();

    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (!a.startsWith("--")) continue;

        const rawKey = a.slice(2);
        const key = norm(rawKey);

        const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
        m.set(key, value);
    }

    return {
        get(name: string) {
            return m.get(norm(name));
        }
    } as unknown as Map<string, string>;
}

export function splitList(v: string | undefined) {
    return (v || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);
}