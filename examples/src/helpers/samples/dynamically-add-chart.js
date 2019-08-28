const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  import { onDestroy } from 'svelte';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let para,
    enableButton,
    disableButton,
    dataSource = { /* see data tab */ },
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataSource
    };

  const clickEventHandler = (event, data) => {
      para.innerHTML = 'You have clicked on plot <b>' + data.categoryLabel +
        '</b> which has a value of <b>' + data.displayValue + '</b>';
    },
    attachEvent = () => {
      FusionCharts.addEventListener('dataplotclick',clickEventHandler );

      enableButton.classList.add('disabled');
      disableButton.classList.remove('disabled');
    },
    detachEvent = () => {
      FusionCharts.removeEventListener('dataplotclick', clickEventHandler);
      para.innerHTML = 'Click the below buttons to add an event dynamically to a chart';

      enableButton.classList.remove('disabled');
      disableButton.classList.add('disabled');
    };

  onDestroy(() => {
    FusionCharts.removeEventListener('dataplotclick', clickEventHandler);
  });
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>
<div>
  <p bind:this={para} id="message" style="padding: 5px; margin: 0px;" >
    Click the below buttons to add an event dynamically to a chart
  </p>
</div>
<div style="text-align: center; padding-top: 5px;">
  <button
    class="btn btn-outline-secondary btn-sm"
    on:click={attachEvent}
    bind:this={enableButton}
  >
    Add/listen to dataplotclick event
  </button>
  <button
    class="btn btn-outline-secondary btn-sm disabled"
    on:click={detachEvent}
    bind:this={disableButton}
  >
    Remove dataplotclick event
  </button>
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
