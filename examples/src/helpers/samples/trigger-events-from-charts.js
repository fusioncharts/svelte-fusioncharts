const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  import dataSource from './data.js';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let para,
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataSource
    };

  const rollOverHandler = customEvent => {
      let args = customEvent.detail.data;
      para.innerHTML = 'You are currently hovering over <b>' + args.categoryLabel +
            '</b> whose value is <b>' + args.displayValue + '</b>';
    },
    rollOutHandler = () => {
      para.innerHTML = 'Hover on the plot to see the value along with the label';
    };
</script>
`,
html =
`<div id="chart-container" >
  <SvelteFC
    {...chartConfig}
    on:dataplotRollOver={rollOverHandler}
    on:dataplotRollOut={rollOutHandler}
  />
</div>
<div>
  <p bind:this={para} id="message" style="padding: 10px; background: rgb(245, 242, 240);" >
    Hover on the plot to see the value along with the label
  </p>
</div>`,
data =
`export default {
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
