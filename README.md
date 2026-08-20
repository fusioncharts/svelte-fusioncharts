# Svelte-FusionCharts

A simple and lightweight official Svelte component for FusionCharts JavaScript charting library. `svelte-fusioncharts` enables you to add JavaScript charts in your Svelte application or project without any hassle.

## [Demo](https://fusioncharts.github.io/svelte-fusioncharts/)

- Github Repo: [https://github.com/fusioncharts/svelte-fusioncharts](https://github.com/fusioncharts/svelte-fusioncharts)
- Support: [https://www.fusioncharts.com/contact-support](https://www.fusioncharts.com/contact-support)
- FusionCharts
  - Official Website: [https://www.fusioncharts.com/](https://www.fusioncharts.com/)
  - Official NPM Package: [https://www.npmjs.com/package/fusioncharts](https://www.npmjs.com/package/fusioncharts)
- Issues: [https://github.com/fusioncharts/svelte-fusioncharts/issues](https://github.com/fusioncharts/svelte-fusioncharts/issues)

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Using with SvelteKit](#using-with-sveltekit)
  - [Using with plain Vite](#using-with-plain-vite-not-sveltekit)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Working with chart API](#working-with-apis)
  - [Working with events](#working-with-events)
- [Quick Start](#quick-start)
- [Going Beyond Charts](#going-beyond-charts)
- [Usage and Integration of FusionTime](#usage-and-integration-of-fusiontime)
- [For Contributors](#for-contributors)
- [Licensing](#licensing)

## Getting Started

### Requirements

- **Node.js**, **NPM/Yarn** installed globally in your OS.
- **FusionCharts** and **Svelte** installed in your project, as detailed below:

#### Svelte compatibility

`svelte-fusioncharts` works with **both Svelte 4 and Svelte 5** (declared as a peer
dependency: `^4.0.0 || ^5.0.0`).

The package ships the uncompiled `.svelte` source (the modern Svelte library
packaging model) and is compiled by your app's own Svelte version. This means you
need a Svelte-aware bundler, any of
[`@sveltejs/vite-plugin-svelte`](https://github.com/sveltejs/vite-plugin-svelte),
[`svelte-loader`](https://github.com/sveltejs/svelte-loader), or
[`rollup-plugin-svelte`](https://github.com/sveltejs/rollup-plugin-svelte). Every
SvelteKit / Vite / Svelte project already has one. Most setups work with just
the install, but a couple of environments need a one-line tweak, covered below.

### Using with SvelteKit

Charts always render in the browser. FusionCharts needs a live DOM, so the chart
itself is drawn on the client in both Svelte and SvelteKit. The one thing to know:
FusionCharts reads `document` the moment it's imported, so it can't be imported
during server-side rendering. On a normal SvelteKit page the `import` runs on the
server and you'll hit `ReferenceError: document is not defined`.

The simplest fix is to render chart routes on the client only. One line does it,
put it on a page, or on a layout to cover a whole dashboard:

```js
// src/routes/dashboard/+page.js   (or +layout.js for a whole section)
export const ssr = false;
```

Every chart under that route then works with the normal import + `fcRoot` setup,
no per-component workarounds needed.

If you need SSR on the rest of a page and only have an isolated chart, import just
that chart component lazily from `onMount` instead:

```svelte
<script>
  import { onMount } from 'svelte';
  let Chart = $state(null);
  onMount(async () => { Chart = (await import('$lib/MyChart.svelte')).default; });
</script>

{#if Chart}<Chart />{/if}
```

### Using with plain Vite (not SvelteKit)

Vite pre-bundles dependencies with esbuild, which can't parse `.svelte`. Exclude
this package so the Svelte plugin compiles it instead:

```js
// vite.config.js
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: { exclude: ['svelte-fusioncharts'] }
});
```

### Installation

There are multiple ways to install `svelte-fusioncharts` component.

**Install from NPM**

```
npm install --save svelte-fusioncharts
```

See [npm documentation](https://docs.npmjs.com/) to know more about npm usage.

### Usage

Import `svelte-fusioncharts` and FusionCharts in your app:

```
<script>
  import FusionCharts from 'fusioncharts/core';
  import Column2d from 'fusioncharts/viz/column2d';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Column2d);
</script>
```

Note: This way of import will not work in IE11 and below.

## Quick Start

Here is a basic sample that shows how to create a chart using `svelte-fusioncharts`:

```javascript
<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  // Always set FusionCharts as the first parameter
  fcRoot(FusionCharts, Charts, FusionTheme);

  const dataSource = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
    ]
  };

  const chartConfigs = {
    type: 'column2d',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource
  };
</script>

<SvelteFC {...chartConfigs} />
```

## Render FusionMaps

To render a map, import the FusionMaps module along with the map definition.

```javascript
<script>
  import FusionCharts from 'fusioncharts';
  import Maps from 'fusioncharts/fusioncharts.maps';
  import World from 'fusioncharts/maps/fusioncharts.world';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  // Always set FusionCharts as the first parameter
  fcRoot(FusionCharts, Maps, World, FusionTheme);

  const dataSource = {
    chart: {
      caption: 'Average Annual Population Growth',
      subcaption: ' 1955-2015',
      numbersuffix: '%',
      includevalueinlabels: '1',
      labelsepchar: ': ',
      entityFillHoverColor: '#FFF9C4',
      theme: 'fusion'
    },
    colorrange: {
      minvalue: '0',
      code: '#FFE0B2',
      gradient: '1',
      color: [
        { minvalue: '0.5', maxvalue: '1.0', color: '#FFD74D' },
        { minvalue: '1.0', maxvalue: '2.0', color: '#FB8C00' },
        { minvalue: '2.0', maxvalue: '3.0', color: '#E65100' }
      ]
    },
    data: [
      { id: 'NA', value: '.82', showLabel: '1' },
      { id: 'SA', value: '2.04', showLabel: '1' },
      { id: 'AS', value: '1.78', showLabel: '1' },
      { id: 'EU', value: '.40', showLabel: '1' },
      { id: 'AF', value: '2.58', showLabel: '1' },
      { id: 'AU', value: '1.30', showLabel: '1' }
    ]
  };

  const chartConfigs = {
    type: 'world',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource
  };
</script>

<SvelteFC {...chartConfigs} />
```

## Working with Events

To attach event callbacks to a FusionCharts component, follow the sample below.

```javascript
<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  // Always set FusionCharts as the first parameter
  fcRoot(FusionCharts, Charts, FusionTheme);

  const dataSource = {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
        { label: 'Iran', value: '140' },
        { label: 'Russia', value: '115' },
        { label: 'UAE', value: '100' },
        { label: 'US', value: '30' },
        { label: 'China', value: '30' }
      ]
    },
    dataplotClickHandler = event => {
      // code for dataplotClick event handler
    },
    renderCompleteHandler = event => {
      // code for renderComplete event handler
    };

  const chartConfigs = {
    type: 'column2d',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource
  };
</script>

<SvelteFC
  {...chartConfigs}
  on:dataplotClick={dataplotClickHandler}
  on:renderComplete={renderCompleteHandler}
/>
```

## Working with APIs

To call APIs we will need the chart object. To get the chart object for an SvelteFC component, bind a variable with the <code>chart</code> property of SvelteFC component.

```javascript
<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';

  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartObj,
    dataSource = {
      "chart": {
        "caption": "Market Share of Web Servers",
        "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
        "showLegend": "1",
        "showPercentValues": "1",
        "legendPosition": "bottom",
        "useDataPlotColorForLabels": "1",
        "enablemultislicing": "0",
        "showlegend": "0",
        "theme": "fusion",
      },
      "data": [{
        "label": "Apache",
        "value": "32647479"
      }, {
        "label": "Microsoft",
        "value": "22100932"
      }, {
        "label": "Zeus",
        "value": "14376"
      }, {
        "label": "Other",
        "value": "18674221"
      }]
    },
    chartConfig = {
      type: 'pie2d',
      width: '600',
      height: '400',
      dataSource
    };

  const sliceDataPlot = (index, sliceOut = true) => {
    chartObj.slicePlotItem(index, sliceOut)
  };
</script>

<div id="chart-container" >
  <SvelteFC {...chartConfig} bind:chart={chartObj} />
</div>

<button on:click={() => {
  sliceDataPlot(1);
}}>
  Slice out
</button>
<button on:click={() => {
  sliceDataPlot(1, false);
}} >
  Slice in
</button>
```

links to help you get started:

- [Live samples with code](https://fusioncharts.github.io/svelte-fusioncharts/)
- [Documentation](https://www.fusioncharts.com/dev/getting-started/svelte/your-first-chart-using-svelte)
- [Use Chart API events & methods in Svelte](https://www.fusioncharts.com/dev/getting-started/svelte/configure-your-chart-using-svelte)
- [Chart gallery](https://www.fusioncharts.com/explore/chart-gallery)
- [FusionCharts API](https://www.fusioncharts.com/dev/api/fusioncharts)

## Usage and integration of FusionTime

FusionCharts supports timeseries data via the FusionTime module.

Learn more about FusionTime [here](https://www.fusioncharts.com/fusiontime).

### Consider the example below for integration of FusionTime

```javascript
<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
    ).then(jsonify);

  promise = Promise.all([dataFetch, schemaFetch]);

  const getChartConfig = ([data, schema]) => {
    const fusionDataStore = new FusionCharts.DataStore(),
      fusionTable = fusionDataStore.createDataTable(data, schema);

    return {
      type: 'timeseries',
      width: '100%',
      height: 450,
      dataSource: {
        data: fusionTable,
        caption: {
          text: 'Sales Analysis'
        },
        subcaption: {
          text: 'Grocery'
        },
        yAxis: [
          {
            plot: {
              value: 'Grocery Sales Value',
              type: 'line'
            },
            format: {
              prefix: '$'
            },
            title: 'Sale Value'
          }
        ]
      }
    };
  };
</script>

<div id="chart-container" >
  {#await promise}
    <p>Fetching data and schema...</p>
  {:then value}
    <SvelteFC
      {...getChartConfig(value)}
    />
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>
```

Useful links for FusionTime

- [How FusionTime works](https://www.fusioncharts.com/dev/fusiontime/getting-started/how-fusion-time-works)
- [Create your first chart](https://www.fusioncharts.com/dev/fusiontime/getting-started/create-your-first-chart-in-fusiontime)

## Going Beyond Charts

- Explore 20+ pre-built business specific dashboards for different industries like energy and manufacturing to business functions like sales, marketing and operations [here](https://www.fusioncharts.com/explore/dashboards).
- See [Data Stories](https://www.fusioncharts.com/explore/data-stories) built using FusionCharts’ interactive JavaScript visualizations and learn how to communicate real-world narratives through underlying data to tell compelling stories.

## For Contributors

The library itself is the `.svelte` source under [`src/`](src). There is no build
step (the package ships source). To run it against real charts, use one of the
example apps under [`examples/`](examples):

- [`examples/svelte4-webpack/`](examples/svelte4-webpack): **Svelte 4** gallery (webpack + `svelte-loader`).
- [`examples/svelte5-vite/`](examples/svelte5-vite): **Svelte 5** app (Vite + `@sveltejs/vite-plugin-svelte`).
- [`examples/sveltekit/`](examples/sveltekit): **SvelteKit** app (Svelte 5, SSR, with the client-only chart guard).

```
git clone https://github.com/fusioncharts/svelte-fusioncharts.git
cd svelte-fusioncharts

# pick one:
cd examples/svelte4-webpack && npm i && npm run dev
cd examples/svelte5-vite   && npm i && npm run dev
cd examples/sveltekit      && npm i && npm run dev
```

Each example app declares a normal registry dependency on `svelte-fusioncharts`,
exactly like an application in the wild would. That is deliberate: it means you can
copy any one of these directories out of the repo, run `npm install`, and it works
standalone with no reference back to this tree.

The tradeoff is that a plain `npm install` gives you the **published** wrapper, not
your working copy. If you are changing the wrapper itself, point an example at your
local source, described next.

### Working on the wrapper itself

Two ways to run an example against your local changes instead of the published
package. Neither should be committed.

**Option 1, live source (fastest iteration).** npm resolves this as a symlink to the
repo root, so edits to `src/index.svelte` take effect with no reinstall:

```
cd examples/svelte5-vite
npm install ../.. --no-save
```

**Option 2, real tarball (highest fidelity).** This installs the exact payload that
`npm publish` would upload, extracted into `node_modules` as a real directory rather
than a symlink:

```
npm pack                       # from the repo root, writes svelte-fusioncharts-<version>.tgz
cd examples/svelte5-vite
npm install ../../svelte-fusioncharts-<version>.tgz --no-save
```

Prefer Option 2 before publishing anything. A symlinked wrapper resolves to a path
with no `node_modules` segment in it, and some toolchains key behaviour off that.
The SvelteKit/Vite templates, for instance, treat files outside `node_modules` as
first-party source and can force them into runes mode, which makes a Svelte 4
compatible wrapper fail to compile for reasons that have nothing to do with your
change. Option 2 does not have that problem, because the install looks like every
other dependency.

To get back to the published package, run `npm install` again.

Two things worth knowing while iterating:

- After editing wrapper source under Option 1, Vite may still serve the old code from
  its dependency cache. Run `rm -rf node_modules/.vite` and restart the dev server.
  A full reinstall is not needed, since the link is live.
- FusionCharts is browser only and touches `document` at import time, so any static
  import of it breaks SSR. That is why the SvelteKit example sets
  `export const ssr = false`.

### Verifying what gets published

The `files` allowlist in `package.json` decides what actually ships. A local link or
a stale install can hide a gap in it, and a real `npm install` would then fail for
every consumer. This check packs the tarball npm would publish and asserts that
every entry point and relative import is inside it:

```
npm run verify:package
```

It also runs automatically on `prepublishOnly`, so a publish cannot skip it.

## Licensing

The FusionCharts Svelte component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FusionCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).
