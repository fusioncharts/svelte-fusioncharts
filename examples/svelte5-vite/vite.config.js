import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// `svelte-fusioncharts` ships uncompiled `.svelte` source, so it must be excluded
// from Vite's dependency pre-bundling and compiled by vite-plugin-svelte instead.
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    exclude: ['svelte-fusioncharts']
  }
});
