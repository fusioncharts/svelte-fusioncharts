<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
  import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
  import ZuneTheme from 'fusioncharts/themes/fusioncharts.theme.zune';
  import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
  import CarbonTheme from 'fusioncharts/themes/fusioncharts.theme.carbon';
  
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import dataSourceStore from '../utils/chart-viewer-data.js';
  import { sampleNames } from '../utils/constants.js';

  FusionCharts.options.creditLabel = false;

  fcRoot(FusionCharts, Charts, FusionTheme, GammelTheme, CandyTheme, ZuneTheme, OceanTheme, CarbonTheme);

  let chartObj,
    chartConfig = {
      id: 'column-chart',
      type: 'column2d',
      width: '100%',
      height: '100%',
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

  #select-text {
    padding: 4px;
  }
</style>

<div id='chart-container' style='height: 90%;' >
  <SvelteFC {...chartConfig} bind:chart={chartObj} />
</div>
<div style="display: flex; position: absolute; bottom: 15px;">
  <div id="select-text">Choose a theme:</div>
  <div class="change-type">
    <div id="radio1">
      <input
        name="theme-selecter"
        id="radioButton1"
        type="radio"
        on:change={() => {
          updateDataHandler('theme', 'fusion');
        }}
        checked="checked"
      >
      <label for="radioButton1">Fusion</label>
    </div>
    <div id="radio2">
      <input
        name="theme-selecter"
        id="radioButton2"
        type="radio"
        on:change={() => {
          updateDataHandler('theme', 'gammel');
        }}
      >
      <label for="radioButton2">Gammel</label>
    </div>
    <div id="radio3">
      <input
        name="theme-selecter"
        id="radioButton3"
        type="radio"
        on:change={() => {
          updateDataHandler('theme', 'candy');
        }}
      >
      <label for="radioButton3">Candy</label>
    </div>
    <div id="radio4">
      <input
        name="theme-selecter"
        id="radioButton4"
        type="radio"
        on:change={() => {
          updateDataHandler('theme', 'zune');
        }}
      >
      <label for="radioButton4">Zune</label>
    </div>
    <div id="radio5">
      <input
        name="theme-selecter"
        id="radioButton5"
        type="radio"
        on:change={() => {
          updateDataHandler('theme', 'ocean');
        }}
      >
      <label for="radioButton5">Ocean</label>
    </div>
    <div id="radio6">
      <input
        name="theme-selecter"
        id="radioButton6"
        type="radio"
        on:change={() => {
          updateDataHandler('theme', 'carbon');
        }}
      >
      <label for="radioButton6">Carbon</label>
    </div>
  </div>
</div>