const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';

  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  import { sampleNames } from '../utils/constants.js';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartObj,
    chartConfig = {
      id: 'column-chart',
      type: 'column2d',
      width: '600',
      height: '400',
      renderAt: 'chart-container',
      dataSource
    };

  const changeChartTypeHandler = arg => {
    chartObj.chartType(arg);
  };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} bind:chart={chartObj} />
</div>
<div style="display: flex; position: absolute; bottom: 15px; justify-content: center; width: 100%">
  <div class="change-type">
    <div id="radio1">
      <input
        name="theme-selecter"
        id="radioButton1"
        type="radio"
        on:change={() => {
          changeChartTypeHandler('column2d');
        }}
        checked="checked"
      >
      <label for="radioButton1">Column 2D Chart</label>
    </div>
    <div id="radio2">
      <input
        name="theme-selecter"
        id="radioButton2"
        type="radio"
        on:change={() => {
          changeChartTypeHandler('bar2d');
        }}
      >
      <label for="radioButton2">Bar 2D Chart</label>
    </div>
    <div id="radio3">
      <input
        name="theme-selecter"
        id="radioButton3"
        type="radio"
        on:change={() => {
          changeChartTypeHandler('pie2d');
        }}
      >
      <label for="radioButton3">Pie 2D Chart</label>
    </div>
  </div>
</div>`,
data =
`{
  "chart": {
    "caption": "Recommended Portfolio Split",
    "subCaption" : "For a net-worth of $1M",
    "showValues":"1",
    "showPercentInTooltip" : "0",
    "numberPrefix" : "$",
    "enableMultiSlicing":"1",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Equity",
      "value": "300000"
    }, {
      "label": "Debt",
      "value": "230000"
    }, {
      "label": "Bullion",
      "value": "180000"
    }, {
      "label": "Real-estate",
      "value": "270000"
    }, {
      "label": "Insurance",
      "value": "20000"
    }
  ]
}`;

export default {
  code,
  html,
  data
};
