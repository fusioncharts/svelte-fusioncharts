const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let para,
    dataSource = { /* see data tab */ },
    total = dataSource.data.reduce((p, c) => {
      return p + Number(c.value);
    }, 0),
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataSource,
      events: {
        dataplotrollover: function (event, args) {
          let value = (args.value / total * 100).toFixed(2);
          para.innerHTML = '<b>' + args.categoryLabel + '</b> is <b>' + value +
          '%</b> of top 8 oil reserve countries';
        },
        dataplotrollout: function (event, args) {
          para.innerHTML = 'Hover on the plot to see the value along with the label';
        }
      }
    };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>
<div>
  <p bind:this={para} id="message" style="padding: 10px; background: rgb(245, 242, 240);" >
    Hover on the plot to see the percentage along with the label
  </p>
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
