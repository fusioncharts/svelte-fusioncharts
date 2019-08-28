const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';

  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartObj,
    chartConfig = {
      type: 'pie2d',
      width: '600',
      height: '400',
      renderAt: 'chart-container',
      dataSource 
    };

  const sliceDataPlot = (indices, sliceOut = true) => {
    indices.forEach(index => {
      chartObj.slicePlotItem(index, sliceOut);
    });
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
          sliceDataPlot([0, 1, 2, 3], false);
        }}
        checked="checked"
      >
      <label for="radioButton1">None</label>
    </div>
    <div id="radio2">
      <input
        name="theme-selecter"
        id="radioButton2"
        type="radio"
        on:change={() => {
          sliceDataPlot([0]);
        }}
      >
      <label for="radioButton2">Apache</label>
    </div>
    <div id="radio3">
      <input
        name="theme-selecter"
        id="radioButton3"
        type="radio"
        on:change={() => {
          sliceDataPlot([1]);
        }}
      >
      <label for="radioButton3">Microsoft</label>
    </div>
    <div id="radio3">
      <input
        name="theme-selecter"
        id="radioButton3"
        type="radio"
        on:change={() => {
          sliceDataPlot([2]);
        }}
      >
      <label for="radioButton3">Zeus</label>
    </div>
    <div id="radio3">
      <input
        name="theme-selecter"
        id="radioButton3"
        type="radio"
        on:change={() => {
          sliceDataPlot([3]);
        }}
      >
      <label for="radioButton3">Other</label>
    </div>
  </div>
</div>`,
data =
`{
  "chart": {
    "caption": "Market Share of Web Servers",
    "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
    "showLegend": "1",
    "showPercentValues": "1",
    "legendPosition": "bottom",
    "useDataPlotColorForLabels": "1",
    "enablemultislicing": "0",
    "showlegend": "0",
    "theme": "fusion",
  },
  "data": [{
    "label": "Apache",
    "value": "32647479"
  }, {
    "label": "Microsoft",
    "value": "22100932"
  }, {
    "label": "Zeus",
    "value": "14376"
  }, {
    "label": "Other",
    "value": "18674221"
  }]
}`;

export default {
  code,
  html,
  data
};
