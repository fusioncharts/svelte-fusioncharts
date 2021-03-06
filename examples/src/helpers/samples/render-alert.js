const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  import dataSource from './data.js';

  fcRoot(FusionCharts, PowerCharts, FusionTheme);

  let para,
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataSource
    };

  const beforeDataUpdateHandler = () => {
      para.innerHTML += 'beforeDataUpdate, ';
    },
    dataUpdatedHandler = () => {
      para.innerHTML += 'dataUpdated, ';
    },
    drawCompleteHandler = () => {
      para.innerHTML += 'drawComplete, '
    },
    renderCompleteHandler = () => {
      para.innerHTML += 'renderComplete'
    };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC
    {...chartConfig}
    on:beforeDataUpdate={beforeDataUpdateHandler}
    on:dataUpdated={dataUpdatedHandler}
    on:drawComplete={drawCompleteHandler}
    on:renderComplete={renderCompleteHandler}
  />
</div>
<div>
  <p bind:this={para} id="message" style="padding: 10px; background: rgb(245, 242, 240);" >
    <b>Status: </b>
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
