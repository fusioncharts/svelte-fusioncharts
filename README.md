# Svelte-FusionCharts

A simple and lightweight official Svelte component for FusionCharts JavaScript charting library. `svelte-fusioncharts` enables you to add JavaScript charts in your Svelte application or project without any hassle.

## [Demo](https://fusioncharts.github.io/react-fusioncharts-component/)

- Github Repo: [https://github.com/fusioncharts/react-fusioncharts-component](https://github.com/fusioncharts/react-fusioncharts-component)
- Documentation: [https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react)
- Support: [https://www.fusioncharts.com/contact-support](https://www.fusioncharts.com/contact-support)
- FusionCharts
  - Official Website: [https://www.fusioncharts.com/](https://www.fusioncharts.com/)
  - Official NPM Package: [https://www.npmjs.com/package/fusioncharts](https://www.npmjs.com/package/fusioncharts)
- Issues: [https://github.com/fusioncharts/react-fusioncharts-component/issues](https://github.com/fusioncharts/react-fusioncharts-component/issues)

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Working with chart API](#working-with-apis)
  - [Working with events](#working-with-events)
- [Quick Start](#quick-start)
- [Custom Components](#custom-components)
  - [Drill Down](#drill-down-component)
- [Going Beyond Charts](#going-beyond-charts)
- [Usage and Integration of FusionTime](#usage-and-integration-of-fusionTime)
- [For Contributors](#for-contributors)
- [Licensing](#licensing)

## Getting Started

### Requirements

- **Node.js**, **NPM/Yarn** installed globally in your OS.
- **FusionCharts** and **Svelte** installed in your project, as detailed below:

### Installation

There are multiple ways to install `svelte-fusioncharts` component.

**Direct Download**
All binaries are located on our [github repository](https://github.com/fusioncharts/react-fusioncharts-component).

**Install from NPM**

```
npm install --save svelte-fusioncharts
```

See [npm documentation](https://docs.npmjs.com/) to know more about npm usage.

**Install from Yarn**

```
yarn add svelte-fusioncharts
```

See [yarn documentation](https://yarnpkg.com/en/docs) to know more about yarn usage.

For general instructions, refer to this [developer docs page](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react#installation-2).

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
    events = {
      dataplotClick: function (e) {
        // code for dataplotClick event handler
      },
      renderComplete: function (e) {
        // code for renderComplete event handler
      }
    };

  const chartConfigs = {
    type: 'column2d',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: dataSource,
    events: events
  };
</script>

<SvelteFC {...chartConfigs} />
```

## Usage and integration of FusionTime

From `fusioncharts@3.13.3-sr.1`, You can visualize timeseries data.

Learn more about FusionTime [here](https://www.fusioncharts.com/fusiontime).

### Consider the example below for integration of FusionTime

```javascript
import React from 'react';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, TimeSeries);

const jsonify = res => res.json();
const dataFetch = fetch(
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/data.json'
).then(jsonify);
const schemaFetch = fetch(
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json'
).then(jsonify);

class ChartViewer extends React.Component {
  constructor(props) {
    super(props);
    this.onFetchData = this.onFetchData.bind(this);
    this.state = {
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '600',
        height: '400',
        dataSource: {
          caption: { text: 'Online Sales of a SuperStore in the US' },
          data: null,
          yAxis: [
            {
              plot: [
                {
                  value: 'Sales ($)'
                }
              ]
            }
          ]
        }
      }
    };
  }

  componentDidMount() {
    this.onFetchData();
  }

  onFetchData() {
    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        timeseriesDs
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.timeseriesDs.dataSource.data ? (
          <ReactFC {...this.state.timeseriesDs} />
        ) : (
          'loading'
        )}
      </div>
    );
  }
}
```

Useful links for FusionTime

- [How FusionTime works](https://www.fusioncharts.com/dev/fusiontime/getting-started/how-fusion-time-works)
- [Create your first chart](https://www.fusioncharts.com/dev/fusiontime/getting-started/create-your-first-chart-in-fusiontime)


## Working with APIs

To call APIs we will need the chart object. To get the chart object for an React-FC component, pass a callback through the attribute `onRender`.

Write the callback:

As a separate function:

```javascript
var chartRenderCallback  = function (chart) {
  [Code goes here]
}
```

Or, as a component class method:

```javascript
chartRenderCallback (chart) {
  [Code goes here]
}
```

Pass the callback as a prop, to which the chart object will be returned on rendering

```
<ReactFC {...chartConfigs} onRender={chartRenderCallback} />
```

##### Consider the example below that conerts a Column 2D chart to a Pie 2D chart after 5 seconds.

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const dataSource = /* Data source A given above */;

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: dataSource
};

class Chart extends Component {
  // Convert the chart to a 2D Pie chart after 5 secs.
  alterChart(chart) {
    setTimeout(() => {
      chart.chartType('pie2d');
    }, 5000);
  }

  render() {
    return (
      <div>
        <ReactFC {...chartConfigs} onRender={alterChart} />
      </div>
    );
  }
}

ReactDOM.render(<Chart />, document.getElementById('root'));
```

links to help you get started:

- [Live samples with code](https://fusioncharts.github.io/react-fusioncharts-component/)
- [Documentation](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react)
- [Use Chart API events & methods in React](https://www.fusioncharts.com/dev/getting-started/react/configure-your-chart-using-react)
- [Chart gallery](https://www.fusioncharts.com/explore/chart-gallery)
- [FusionCharts API](https://www.fusioncharts.com/dev/api/fusioncharts)

## Going Beyond Charts

- Explore 20+ pre-built business specific dashboards for different industries like energy and manufacturing to business functions like sales, marketing and operations [here](https://www.fusioncharts.com/explore/dashboards).
- See [Data Stories](https://www.fusioncharts.com/explore/data-stories) built using FusionCharts’ interactive JavaScript visualizations and learn how to communicate real-world narratives through underlying data to tell compelling stories.

## For Contributors

- Clone the repository and install dependencies

```
$ git clone https://github.com/fusioncharts/svelte-fusioncharts.git
$ cd svelte-fusioncharts
$ npm i
$ npm start
```

- Run `npm run build` to start the dev server and point your browser at [http://localhost:3000/](http://localhost:3000/).

## Licensing

The FusionCharts Svelte component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FusionCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).
