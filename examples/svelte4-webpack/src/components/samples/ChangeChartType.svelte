<script>
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
      width: '100%',
      height: 400,
      dataSource: {
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
      }
    };

  const changeChartTypeHandler = arg => {
    chartObj.chartType(arg);
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
    font-size: 12px;
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
    border-radius: 50%;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
  }

  .change-type label:after {
    width: 10px;
    height: 10px;
    top: 50%;
    left: 11px;
    transform: translateY(-50%);
    border-radius: 50%;
  }

  .change-type input:checked~label {
    color: #48b884;
    font-weight: 600;
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
</div>