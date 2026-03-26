import * as fs from "fs/promises";
import React from "react";
import { renderToString } from "react-dom/server";
import { resolve } from "path";
import { InstanceInfo } from "./instance";
import { pages } from "./pages";
import * as dirs from "./dirs";
import { watch } from "chokidar";
import { createServer } from "vite";

async function main() {
    const engine = new Engine();
    const mode = process.argv[2];
    if (mode === "--develop") {
        engine.develop();
    } else {
        engine.build();
    }
}

/**
 * Rendering engine.
 */
class Engine {
    readonly pages: string[] = [];
    readonly templateToInstances: { [template: string]: InstanceInfo<any>[] } = {};

    /**
     * Starts a development server.
     */
    async develop() {
        console.log("starting development server");

        // Clean output dir
        fs.rm(dirs.intermediate, { recursive: true, force: true });

        // Create output dir
        await fs.mkdir(dirs.intermediate, { recursive: true });

        // Identify all source files
        const sources = await fs.readdir(dirs.source, { withFileTypes: true, recursive: true });
        for (const entry of sources) {
            const source = normalizePath(`${entry.parentPath}/${entry.name}`);

            // If directory, skip
            if (entry.isDirectory()) {
                continue;
            }

            // If not TypeScript or not listed as page, copy as-is
            if (!entry.name.endsWith(".tsx") || !pages.includes(source)) {
                const out = source.replace(dirs.source, dirs.intermediate);
                const outParent = normalizePath(entry.parentPath).replace(
                    dirs.source,
                    dirs.intermediate,
                );
                await fs.mkdir(outParent, { recursive: true });
                await fs.copyFile(source, out);
                continue;
            }

            // If template file, calculate instances and then create pages
            if (source.endsWith(".template.tsx")) {
                const module = await import(`file://${resolve(source)}`);
                const instances: InstanceInfo<any>[] = await module.instances();
                for (const instance of instances) {
                    await this.createDevPage(instance.path, source, instance.params);
                }
                this.templateToInstances[source] = instances;
                continue;
            }

            // Otherwise, create single page
            const path = source.replace("src/", "").replace(".tsx", "");
            await this.createDevPage(path, source);
        }

        // Watch for changes
        console.log(`watching for changes in '${dirs.source}'`);
        const watcher = watch(dirs.source, { ignoreInitial: true });
        watcher.on("all", async (event: "add" | "change" | "unlink", rawPath: string) => {
            const source = normalizePath(rawPath);

            if (event === "add") {
                // If not listed as page, copy as-is
                if (!pages.includes(source)) {
                    console.log(`created: ${source}`);
                    const out = source.replace(dirs.source, dirs.intermediate);
                    await fs.copyFile(source, out);
                    return;
                }

                // If template file, calculate instances and then create pages
                if (source.endsWith(".template.tsx")) {
                    console.log(`created: ${source}`);
                    const module = await import(`file://${resolve(source)}`);
                    const instances: InstanceInfo<any>[] = await module.instances();
                    for (const instance of instances) {
                        await this.createDevPage(instance.path, source, instance.params);
                    }
                    this.templateToInstances[source] = instances;
                    return;
                }

                // Otherwise, create single page
                console.log(`created: ${source}`);
                const path = source.replace("src/", "").replace(".tsx", "");
                await this.createDevPage(path, source);
            }

            if (event === "change") {
                // If not listed as page, copy as-is
                if (!pages.includes(source)) {
                    console.log(`changed: ${source}`);
                    const out = source.replace(dirs.source, dirs.intermediate);
                    await fs.copyFile(source, out);
                    return;
                }

                // If not a template, copy as-is
                if (!source.endsWith(".template.tsx")) {
                    console.log(`changed: ${source}`);
                    const sanitizedModule = await Engine.getSanitizedModule(source);
                    const out = source
                        .replace(dirs.source, dirs.intermediate)
                        .replace(".tsx", ".source.tsx");
                    await fs.writeFile(out, sanitizedModule);
                    return;
                }

                // Otherwise, copy updated template source to all instances
                console.log(`changed: ${source}`);
                const instances = this.templateToInstances[source];
                const sanitizedModule = await Engine.getSanitizedModule(source);
                for (const instance of instances) {
                    const out = `${dirs.intermediate}/${instance.path}.source.tsx`;
                    await fs.writeFile(out, sanitizedModule);
                }
            }

            if (event === "unlink") {
                // If not listed as page, delete
                if (!pages.includes(source)) {
                    console.log(`deleted: ${source}`);
                    const out = source.replace(dirs.source, dirs.intermediate);
                    await fs.rm(out);
                    return;
                }

                // If template file, delete all instance artifacts
                if (source.endsWith(".template.tsx")) {
                    console.log(`deleted: ${source}`);
                    for (const instance of this.templateToInstances[source]) {
                        const path = instance.path;
                        fs.rm(`${dirs.intermediate}/${path}.html`);
                        fs.rm(`${dirs.intermediate}/${path}.props.json`);
                        fs.rm(`${dirs.intermediate}/${path}.source.tsx`);
                        fs.rm(`${dirs.intermediate}/${path}.main.tsx`);
                    }
                    return;
                }

                // Otherwise, delete single page artifacts
                console.log(`deleted: ${source}`);
                const path = source.replace("src/", "").replace(".tsx", "");
                fs.rm(`${dirs.intermediate}/${path}.html`);
                fs.rm(`${dirs.intermediate}/${path}.props.json`);
                fs.rm(`${dirs.intermediate}/${path}.source.tsx`);
                fs.rm(`${dirs.intermediate}/${path}.main.tsx`);
            }
        });

        // Start vite server
        const server = await createServer({
            configFile: "./vite.config.ts",
            root: dirs.intermediate,
        });
        await server.listen();
        console.log("listening at http://localhost:5173");
    }

    /**
     * Builds a production site.
     */
    async build() {
        // Clean output dir
        fs.rm(dirs.intermediate, { recursive: true, force: true });

        // Create output dir
        await fs.mkdir(dirs.intermediate, { recursive: true });

        // Identify all source files
        const sources = await fs.readdir(dirs.source, { withFileTypes: true, recursive: true });
        for (const entry of sources) {
            const source = normalizePath(`${entry.parentPath}/${entry.name}`);

            // If directory, skip
            if (entry.isDirectory()) {
                continue;
            }

            // If not TypeScript or not listed as page, copy as-is
            if (!entry.name.endsWith(".tsx") || !pages.includes(source)) {
                const out = source.replace(dirs.source, dirs.intermediate);
                const outParent = normalizePath(entry.parentPath).replace(
                    dirs.source,
                    dirs.intermediate,
                );
                await fs.mkdir(outParent, { recursive: true });
                await fs.copyFile(source, out);
                continue;
            }

            // If template file, calculate instances and then create pages
            if (source.endsWith(".template.tsx")) {
                const module = await import(`file://${resolve(source)}`);
                const instances: InstanceInfo<any>[] = await module.instances();
                for (const instance of instances) {
                    await this.createPage(instance.path, source, instance.params);
                }
                continue;
            }

            // Otherwise, create single page
            const path = source.replace("src/", "").replace(".tsx", "");
            await this.createPage(path, source);
        }

        this.saveManifest();
        this.saveSitemap();
    }

    /**
     * Creates a page for development.
     *
     * The `path` is the output path of the page, relative to the site root. For
     * instance, a value of `appointments` will result in a page located at
     * `/appointments`. The `source` is the path to the source module that
     * represents the page. The `params` are opaque parameters passed to the page
     * query and are provided only for template instances.
     */
    async createDevPage(path: string, source: string, params?: any) {
        console.info(`creating page: ${path}`);

        // Calculate leaf name of the page
        const name = path.split("/").at(-1);

        // Load module
        const module = await import(`file://${resolve(source)}`);

        // Load props
        const props = await (module.query?.(params) ?? Promise.resolve({}));

        // Load head content
        const head = module.Head ? renderToString(React.createElement(module.Head, props)) : "";

        // Render HTML
        const html = (await fs.readFile("engine/base.html", { encoding: "utf-8" }))
            .replace("<!--head-->", `${head}`) // @todo: not sure if this should be refreshed
            .replace("<!--body-->", "")
            .replace("<!--main-->", `${name}.main.tsx`);

        // Ensure output dir exists
        const parts = path.split("/");
        const base = parts.slice(0, parts.length - 1).join("/");
        await fs.mkdir(`${dirs.intermediate}/${base}`, { recursive: true });

        // Save HTML
        await fs.writeFile(`${dirs.intermediate}/${path}.html`, html);

        // Save module
        const sanitizedModule = await Engine.getSanitizedModule(source);
        await fs.writeFile(`${dirs.intermediate}/${path}.source.tsx`, sanitizedModule);

        // Save props
        await fs.writeFile(`${dirs.intermediate}/${path}.props.json`, JSON.stringify(props));

        // Render main script
        const main = (await fs.readFile("engine/client_main.tsx", { encoding: "utf-8" }))
            .replace("<!--base-->", resolve(dirs.intermediate).replace(/\\/g, "/"))
            .replace("<!--source-->", `${name}.source.tsx`)
            .replace("<!--props-->", `${name}.props.json`)
            .replace("<!--mode-->", "develop");

        // Save main script
        await fs.writeFile(`${dirs.intermediate}/${path}.main.tsx`, main);
    }

    /**
     * Removes non-React exports from the module.
     *
     * This allows us to work around a limitation of hot reload that prevents it
     * from incrementally updating modules that export non-React components.
     */
    static async getSanitizedModule(path: string): Promise<string> {
        const content = await fs.readFile(path, { encoding: "utf-8" });
        return content
            .replace("export async function query", "async function query")
            .replace("export async function instances", "async function instances");
    }

    /**
     * Creates a page.
     *
     * The `path` is the output path of the page, relative to the site root. For
     * instance, a value of `appointments` will result in a page located at
     * `/appointments`. The `source` is the path to the source module that
     * represents the page. The `params` are opaque parameters passed to the page
     * query and are provided only for template instances.
     */
    async createPage(path: string, source: string, params?: any) {
        console.info(`creating page: ${path}`);

        // Calculate leaf name of the page
        const name = path.split("/").at(-1);

        // Load module
        const module = await import(`file://${resolve(source)}`);

        // Load props
        const props = await (module.query?.(params) ?? Promise.resolve({}));

        // Load head content
        const head = module.Head ? renderToString(React.createElement(module.Head, props)) : "";

        // Load body content
        const element = React.createElement(module.default, props);
        const body = renderToString(element);

        // Render HTML
        const html = (await fs.readFile("engine/base.html", { encoding: "utf-8" }))
            .replace("<!--head-->", `${head}`)
            .replace("<!--body-->", body)
            .replace("<!--main-->", `${name}.main.tsx`);

        // Ensure output dir exists
        const parts = path.split("/");
        const base = parts.slice(0, parts.length - 1).join("/");
        await fs.mkdir(`${dirs.intermediate}/${base}`, { recursive: true });

        // Save HTML
        await fs.writeFile(`${dirs.intermediate}/${path}.html`, html);

        // Save module
        await fs.copyFile(source, `${dirs.intermediate}/${path}.source.tsx`);

        // Save props
        await fs.writeFile(`${dirs.intermediate}/${path}.props.json`, JSON.stringify(props));

        // Render main script
        const main = (await fs.readFile("engine/client_main.tsx", { encoding: "utf-8" }))
            .replace("<!--base-->", resolve(dirs.intermediate).replace(/\\/g, "/"))
            .replace("<!--source-->", `${name}.source.tsx`)
            .replace("<!--props-->", `${name}.props.json`)
            .replace("<!--mode-->", "build");

        // Save main script
        await fs.writeFile(`${dirs.intermediate}/${path}.main.tsx`, main);

        // Register page entry point
        this.pages.push(`${path}.html`);
    }

    /**
     * Saves a manifest of generated pages.
     */
    async saveManifest() {
        await fs.writeFile(`${dirs.intermediate}/manifest.json`, JSON.stringify(this.pages));
    }

    /**
     * Saves a sitemap.
     */
    async saveSitemap() {
        const base = "https://familypsychiatry.us";
        const urls = [];
        for (const page of this.pages) {
            const path = page.replace(".html", "");
            const url = `${base}/${path}`;
            urls.push(url);
        }
        await fs.writeFile(`${dirs.intermediate}/public/sitemap.txt`, urls.join("\n"));
    }
}

/**
 * Normalizes a path to use unix path separators.
 */
function normalizePath(path: string): string {
    return path.replace(/\\/g, "/");
}

main();
