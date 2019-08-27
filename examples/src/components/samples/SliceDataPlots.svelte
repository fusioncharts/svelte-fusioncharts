<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import dataSourceStore from '../utils/chart-viewer-data.js';
  import { sampleNames } from '../utils/constants.js';

  FusionCharts.options.creditLabel = false;

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartObj,
    chartConfig = {
      type: 'pie2d',
      width: '100%',
      height: '90%',
      renderAt: 'chart-container',
      dataSource: {
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
      }
    };

  const sliceDataPlot = (indices, sliceOut = true) => {
    indices.forEach(index => {
      chartObj.slicePlotItem(index, sliceOut);
    });
  };
</script>

<style>
  .change-type {
    display: inline-block;
    margin: 0 5px;
  }

  .change-type>div {
    display: inline-flex;
    position: relative;
    margin: 0 5px;
  }

  .change-type label {
    position: relative;
    padding: 5px 10px 5px 30px;
    border-radius: 4px;
  }

  .change-type input {
    opacity: 0;
    cursor: pointer;
    z-index: 1;
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
  }

  .change-type label:before,
  .change-type label:after {
    content: "";
    position: absolute;
  }

  .change-type label:before {
    display: block;
    background: #fff;
    border: 2px solid #949697;
    box-shadow: none;
    border-radius: 50%;
    top: 11px;
    left: 8px;
    width: 1.5rem;
    height: 1.5rem;
  }

  .change-type label:after {
    width: 0.9rem;
    height: 0.9rem;
    top: 14px;
    left: 11px;
    border-radius: 50%;
  }

  .change-type input:checked~label {
    color: #48b884;
    font-weight: 600;
    box-shadow: 0 4px 9px 0 rgba(104, 105, 128, .22);
  }

  .change-type input:checked~label:before {
    color: #fff;
    box-shadow: none;
    border: 2px solid #48b884;
  }

  .change-type input:checked~label:after {
    background: #55bd8d;
  }
</style>

<div id='chart-container' style='height: 90%;' >
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
</div>