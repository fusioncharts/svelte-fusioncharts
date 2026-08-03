# svelte-fusioncharts: SvelteKit example

A **SvelteKit** (Svelte 5) app showing `svelte-fusioncharts` in an SSR project.
It renders the same sample gallery as the `svelte5-vite` example: a sidebar of
samples, a chart viewer, and a live source panel. Scaffolded with `sv create`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

It consumes the wrapper straight from this repo via `file:../..`.

## The one SvelteKit-specific thing

FusionCharts is browser-only. It touches `document` the moment it's imported, so
importing a chart during server-side rendering crashes SSR with
`document is not defined`.

The gallery route ([`src/routes/`](src/routes)) opts out of SSR with one line in
[`+page.js`](src/routes/+page.js):

```js
export const ssr = false;
```

That keeps the browser-only imports off the server, so every sample under the route
uses the normal `import … from 'svelte-fusioncharts'` + `fcRoot(...)` setup with no
per-component workarounds. This is the simplest approach for a chart-heavy page.

If instead you need SSR on for a page and only have one isolated chart, keep the
chart in a leaf component and import it lazily from `onMount`. See the main
README's "Using with SvelteKit" note.

> Note: this app's `vite.config.js` omits the `sv` template's
> `compilerOptions.runes` override. That override force-enables runes for any file
> outside `node_modules`, which breaks the legacy-syntax wrapper when it's linked
> via `file:` (it resolves to a real path with no `node_modules` segment). Svelte 5
> auto-detects the mode per file, so the override isn't needed.
