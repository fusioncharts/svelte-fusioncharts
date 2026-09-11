# Changelog

All notable changes to `svelte-fusioncharts` are documented here.

## 2.0.0

Major release: one package for Svelte 4 and Svelte 5, declared peers, and shipped types. **No chart code changes are required**: the component, its props, and its events are unchanged.

### Added
- **Svelte 5 support** alongside Svelte 4, from a single published package.
- **SvelteKit support.** Chart routes must disable SSR with `export const ssr = false`, because FusionCharts touches `document` at import.
- TypeScript declarations (`index.d.ts`).
- `peerDependencies` declared: `svelte ^4.0.0 || ^5.0.0` and `fusioncharts ^3.0.0 || ^4.0.0`. 1.1.0 declared none, so mismatches now surface at install rather than at runtime.
- Consumer validation apps under `examples/`: Svelte 4 with webpack, Svelte 5 with Vite, and SvelteKit.
- Compatibility and release CI across both Svelte majors, all three examples, and the published archive.

### Changed
- **The package ships source.** An `exports` map with a `svelte` condition replaces the prebuilt bundles; the consumer's bundler compiles it. That is what lets one package serve both majors.
- Four Svelte 5 runtime fixes, including assigning `bind:chart` before `render()` so `beforeRender` handlers receive it.

### Removed
- **The CommonJS entry is removed.** `main: index.js` and the prebuilt `index.mjs` are replaced by the `exports` map. `require()` calls and deep-path imports must become imports by package name.
- `renderAt` removed from samples and documentation. It has always been a no-op; the wrapper renders into its own element. The prop is retained for API parity.

### Security
- Addressed known OSV advisories in the dependency graph.

### Compatibility
- Applications on Svelte 3 should remain on `svelte-fusioncharts@1.0.x`.

## 1.1.0

Svelte 4 support and a modernised Rollup toolchain. `peerDependencies` were not declared in this release.

## 1.0.0

Initial release. Svelte 3.
