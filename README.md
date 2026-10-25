<!-- template -->
> **This is the TypeScript template of a Tessello Module** (TypeScript and the DOM, bundled with esbuild, with no framework). For a template without Svelte, see [tessello-template-svelte](https://github.com/craftskillz/tessello-template-svelte).
>
> - From the `tessello` repository: `just new-module <name> typescript` creates `craftskillz/tessello-<name>` from it, renames everything, turns on GitHub Pages and clones it.
> - By hand: **Use this template** on GitHub. Then replace `my-module` and `My Module` everywhere, with your own Namespace in place of `craftskillz` (in `manifest.json`, `package.json`, `package-lock.json`, the User guide, this README, the pages and `.github/workflows/release.yml`). Delete this section, create an empty `gh-pages` branch, and turn on GitHub Pages from it.
<!-- /template -->
# My Module

A Tessello Module: say here, in one sentence, what it does for the User.

My Module is a Module of [Tessello](https://github.com/craftskillz/tessello), a composable web app where you build your space from Modules: each one a View, and a Widget on the Home. Its Identifier is `@craftskillz/my-module`. Everything it keeps stays in your Tessello space, on your computer.

What it does is in its User guide: [guide/guide.md](guide/guide.md), also shown inside Tessello (ⓘ, then **User guide**).

## Install

- From the Marketplace of Tessello, once My Module is listed there: https://tessello-marketplace.pages.dev/
- Or drop a package onto Tessello: every version is published at `https://craftskillz.github.io/tessello-my-module/<version>.zip`.

## Develop

Node 24 or later. Written in TypeScript and the DOM, bundled with esbuild, with no framework.

```sh
npm ci
npm test            # unit tests
npm run typecheck
npm run build       # writes the package to dist/
npx tessello validate dist
```

With [just](https://github.com/casey/just): `just test`, `just typecheck`, `just build` (builds and validates).

`src/lib/` holds what the View and the Widget share (here, the count kept in the Host storage), `src/view/` and `src/widget/` their pages. `dist/` can be zipped and dropped onto Tessello, or copied into your Modules folder. The Module talks to the Host through [`@tessello/sdk`](https://www.npmjs.com/package/@tessello/sdk) and follows the [Convention](https://github.com/craftskillz/tessello/blob/main/convention/CONVENTION.md).

## Release

From an up-to-date `main` with nothing to commit, run `just publish minor` (or `major`, `patch`, `fix`). It checks types and tests, builds and validates the package, raises the version in `package.json`, `package-lock.json` and `manifest.json`, commits, tags `v<version>` and pushes. The Release workflow then publishes the package on GitHub Pages as `<version>.zip`. A published version is never overwritten: a listing in the Marketplace is pinned to the fingerprint of its bytes.

To list that version on the [Marketplace](https://tessello-marketplace.pages.dev/), once the Release workflow is green: download the published `.zip`, then run `npx tessello publish <version>.zip --url https://<account>.github.io/<repository>/<version>.zip --accept-terms`, which checks it as the Marketplace CI will and opens the pull request (read [PUBLISHING.md](https://github.com/craftskillz/tessello-marketplace/blob/main/PUBLISHING.md) first: `--accept-terms` is your acceptance). A new Module waits for the Maintainer's Approval; later versions are merged once the CI passes.

## License

MIT
