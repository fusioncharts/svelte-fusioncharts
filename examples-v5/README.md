# svelte-fusioncharts — Svelte 5 examples

A minimal [Vite](https://vitejs.dev/) + [`@sveltejs/vite-plugin-svelte`](https://github.com/sveltejs/vite-plugin-svelte) app that runs `svelte-fusioncharts` on **Svelte 5**.

It consumes the wrapper from the parent folder via a `file:..` dependency, so it exercises the real published packaging path: Vite resolves `svelte-fusioncharts` through the package's `svelte` export condition to the uncompiled `src/index.svelte` source and compiles it with Svelte 5.

## Run

```bash
npm install
npm run dev
```

Then open the printed local URL.

## What it covers

The samples were chosen to exercise every code path in the wrapper:

| Sample | Exercises |
| --- | --- |
| Simple Chart | initial render |
| Update Chart Data | re-render on `dataSource` change (`setJSONData`) |
| Change Chart Type | `chart.chartType()` via `bind:chart` |
| Responsive / Resize | `chart.resizeTo()` via `bind:chart` |
| Trigger Events | `on:dataplotRollOver` / `on:dataplotRollOut` |
| Export Charts | `FusionCharts.batchExport()` |
| Simple Timeseries | FusionTime module + `{#await}` |

> The full Svelte 4 example gallery lives in [`../examples`](../examples).
