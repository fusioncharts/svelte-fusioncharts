const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  import dataSource from './data.js';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartConfig = {
    type: 'column2d',
    width: '600',
    height: '400',
    renderAt: 'chart-container',
    dataSource
  };

  const getRandomNumber = () => {
      let max = 300, min = 50;
      return Math.round(((max - min) * Math.random()) + min);
    },
    updateDataHandler = () => {
      let dataSource = chartConfig.dataSource;

      dataSource.data[2].value = getRandomNumber();
      dataSource.data[3].value = getRandomNumber();

      chartConfig = {
        ...chartConfig,
        dataSource
      };
    };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>
<div style="text-align: center; padding-top: 5px;">
  <button class="btn btn-outline-secondary btn-sm" on:click={updateDataHandler}>Click to Update Data</button>
</div>`,
data =
`export default {
  "chart": {
    "caption": "Countries With Most Oil Reserves [2017-18]",
    "subCaption": "In MMbbl = One Million barrels",
    "xAxisName": "Country",
    "yAxisName": "Reserves (MMbbl)",
    "numberSuffix": "K",
    "theme": "fusion",
    "updateAnimduration": "0.4"
  },
  "data": [{
    "label": "Venezuela",
    "value": "290"
  }, {
    "label": "Saudi",
    "value": "260"
  }, {
    "label": "Canada",
    "value": "180"
  }, {
    "label": "Iran",
    "value": "140"
  }, {
    "label": "Russia",
    "value": "115"
  }, {
    "label": "UAE",
    "value": "100"
  }, {
    "label": "US",
    "value": "30"
  }, {
    "label": "China",
    "value": "30"
  }]
}`;

export default {
  code,
  html,
  data
};
