import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Note: the `sv` template ships a `compilerOptions.runes` override that force-enables
// runes for every file outside `node_modules`. That breaks when consuming a
// legacy-syntax library (like svelte-fusioncharts, which uses `export let`) through a
// `file:` link, because the linked package resolves to a real path with no
// `node_modules` segment and gets wrongly forced into runes mode. Svelte 5 auto-detects
// the mode per file, so we simply omit the override.
export default defineConfig({
	plugins: [sveltekit()]
});
