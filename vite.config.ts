import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { VitePluginRadar as radar } from "vite-plugin-radar";

/**
 * Get build entry points.
 */
async function entrypoints(): Promise<string[]> {
    const entries: string[] = [];
    const manifest = "./target/intermediate/manifest.json";
    const pages = await import(manifest, { with: { type: "json" } });
    for (const page of pages.default) {
        entries.push(resolve("target/intermediate", page));
    }
    return entries;
}

export default defineConfig(async ({ command }) => ({
    plugins: [react(), radar({ analytics: { id: "G-QYQZ5QLG34" }, gtm: { id: "GTM-NMZKJ94H" } })],
    css: {
        preprocessorOptions: {
            scss: {
                // unable to silence warnings when using "legacy"
                // develop server fails when using "modern-compiler"
                api: "modern",
                // silence warnings until the following issues are resolved
                // upstream: https://github.com/jgthms/bulma/issues/3907,
                // https://github.com/jgthms/bulma/issues/3920
                quietDeps: true,
            },
        },
    },
    build: {
        rollupOptions: {
            input: command === "build" ? await entrypoints() : [],
        },
    },
}));
