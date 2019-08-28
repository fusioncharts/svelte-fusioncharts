const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartConfig = {
    type: 'mscombi2d',
    width: '600',
    height: '400',
    renderAt: 'chart-container',
    dataSource: { /* see data tab */ }
  };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>`,
data =
`{
  "chart": {
      "caption": "Expense Analysis",
      "subCaption": "ACME Inc.",
      "xAxisname": "Region",
      "yAxisName": "Amount (In USD)",
      "numberPrefix": "$",
      "theme": "fusion"
  },
  "categories": [{
      "category": [{
      "label": "East"
      }, {
      "label": "West"
      }, {
      "label": "South"
      }, {
      "label": "North"
      }]
  }],
  "dataset": [{
      "seriesName": "Actual Expenses",
      "data": [{
      "value": "1441290"
      }, {
      "value": "855912"
      }, {
      "value": "911404"
      }, {
      "value": "648136"
      }]
  }, {
      "seriesName": "Budgeted Expenses",
      "renderAs": "line",
      "data": [{
      "value": "1297430"
      }, {
      "value": "776485"
      }, {
      "value": "685352"
      }, {
      "value": "726791"
      }]
  }, {
      "seriesName": "Unknown liabilities",
      "renderAs": "area",
      "showAnchors" : "0",
      "data": [{
      "value": "143860"
      }, {
      "value": "79427"
      }, {
      "value": "226052"
      }, {
      "value": "78655"
      }]
  }]
}`;

export default {
  code,
  html,
  data
};
