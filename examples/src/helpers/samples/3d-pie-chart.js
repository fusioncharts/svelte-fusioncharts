const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  import dataSource from './data.js';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartConfig = {
    type: 'pie3d',
    width: '600',
    height: '400',
    renderAt: 'chart-container',
    dataSource
  };
</script>`,

html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>`,

data =
`export default {
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
