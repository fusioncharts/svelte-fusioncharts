const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let jsonUrl = 'https://static.fusioncharts.com/sample/oilReserves.json',
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataFormat: 'jsonurl',
      dataSource: jsonUrl
    };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>`,
data =
`{
  "chart": {
      "caption": "Countries With Most Oil Reserves [2017-18]",
      "subCaption": "In MMbbl = One Million barrels",
      "xAxisName": "Country",
      "yAxisName": "Reserves (MMbbl)",
      "numberSuffix": "K",
      "theme": "fusion"
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
