// Builds the Module into a package: manifest.json, icon.svg, the User guide, and the page, script and stylesheet
// of the View and the Widget, with the SDK bundled in. Run with `npm run build` in this folder; the
// package is written to `dist/`, ready to be zipped or placed in a Modules folder.

import { copyFile, cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const at = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export const DIST = at("../dist");

/** Writes the package into `out` (by default `dist/`), replacing what was there. */
export async function buildPackage(out = DIST): Promise<string> {
  await rm(out, { recursive: true, force: true });
  for (const surface of ["view", "widget"]) {
    await mkdir(`${out}/${surface}`, { recursive: true });
    await build({
      entryPoints: { app: at(`../src/${surface}/main.ts`) },
      outdir: `${out}/${surface}`,
      bundle: true,
      format: "esm",
      target: "es2022",
      minify: true,
      logLevel: "warning",
    });
    await copyFile(at(`../src/${surface}/index.html`), `${out}/${surface}/index.html`);
  }
  await copyFile(at("../manifest.json"), `${out}/manifest.json`);
  await copyFile(at("../icon.svg"), `${out}/icon.svg`);
  await cp(at("../guide"), `${out}/guide`, { recursive: true });
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await buildPackage();
