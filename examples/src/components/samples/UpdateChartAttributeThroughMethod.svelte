<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartObj,
    chartConfig = {
      id: 'column-chart',
      type: 'column2d',
      width: '100%',
      height: 400,
      renderAt: 'chart-container',
      dataSource: {
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
      }
    };

  const updateDataHandler = (arg, val) => {
    chartObj.setChartAttribute(arg, val);
  };
</script>

<div id='chart-container' style='height: 90%;' >
  <SvelteFC {...chartConfig} bind:chart={chartObj} />
</div>
<div style="text-align: center; padding-top: 5px;">
  <button class="btn btn-outline-secondary btn-sm" on:click={() => { updateDataHandler('caption', 'CAPTION'); }}>
    Change caption to: caption
  </button>
  <button class="btn btn-outline-secondary btn-sm" on:click={() => { updateDataHandler('xaxisname', 'X-AXIS NAME'); }}>
    Change x_axis name to: x-axis name
  </button>
  <button class="btn btn-outline-secondary btn-sm" on:click={() => { updateDataHandler('yaxisname', 'Y-AXIS NAME'); }}>
    Change y_axis name to: y-axis name
  </button>
  <button
    class="btn btn-outline-secondary btn-sm"
    on:click={() => {
      updateDataHandler('caption', 'Countries With Most Oil Reserves [2017-18]');
      updateDataHandler('xaxisname', 'Country');
      updateDataHandler('yaxisname', 'Reserves (MMbbbl)');
    }}
  >
    reset
  </button>
</div>