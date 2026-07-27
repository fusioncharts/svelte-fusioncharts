<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartObj,
    chartConfig = {
      id: 'rc-chart',
      type: 'column2d',
      width: '600',
      height: '350',
      renderAt: 'rc-container',
      dataSource: {
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
      }
    };

  const resizeChart = (width, height) => {
    chartObj.resizeTo(width, height);
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

  #rc-select-text {
    padding: 4px;
  }
</style>

<div id='rc-container' style='height: 90%; text-align: left;' >
  <SvelteFC {...chartConfig} bind:chart={chartObj} />
</div>
<div style="display: flex; position: absolute; bottom: 15px; justify-content: center; width: 100%">
  <div id="rc-select-text">Select size:</div>
  <div class="change-type">
    <div id="rc-radio1">
      <input
        name="rc-size-selecter"
        id="rcRadioButton1"
        type="radio"
        onchange={() => {
          resizeChart(400, 250);
        }}
      >
      <label for="rcRadioButton1">400 X 250</label>
    </div>
    <div id="rc-radio2">
      <input
        name="rc-size-selecter"
        id="rcRadioButton2"
        type="radio"
        onchange={() => {
          resizeChart(600, 350);
        }}
        checked="checked"
      >
      <label for="rcRadioButton2">600 X 350</label>
    </div>
    <div id="rc-radio3">
      <input
        name="rc-size-selecter"
        id="rcRadioButton3"
        type="radio"
        onchange={() => {
          resizeChart(700, 400);
        }}
      >
      <label for="rcRadioButton3">700 X 400</label>
    </div>
  </div>
</div>
