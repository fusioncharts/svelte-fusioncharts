const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import { onDestroy } from 'svelte';

  fcRoot(FusionCharts, PowerCharts, FusionTheme);

  let para,
    dataSource = ,
    chartConfig = {
      type: 'dragcolumn2d',
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

  FusionCharts.addEventListener('beforeDataUpdate', beforeDataUpdateHandler);
  FusionCharts.addEventListener('dataUpdated', dataUpdatedHandler);
  FusionCharts.addEventListener('drawComplete', drawCompleteHandler);
  FusionCharts.addEventListener('renderComplete', renderCompleteHandler);

  onDestroy(() => {
    FusionCharts.removeEventListener('beforeDataUpdate', beforeDataUpdateHandler);
    FusionCharts.removeEventListener('dataUpdated', dataUpdatedHandler);
    FusionCharts.removeEventListener('drawComplete', drawCompleteHandler);
    FusionCharts.removeEventListener('renderComplete', renderCompleteHandler);
  });
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>
<div>
  <p bind:this={para} id="message" style="padding: 10px; background: rgb(245, 242, 240);" >
    <b>Status: </b>
  </p>
</div>`,
data =
`{
  "chart": {
    "caption": "Android and iOS Devices Sales Projections",
    "subCaption": "Drag the top of columns to adjust projections for 2017 & 2018",
    "numberPrefix": "$",
    "numberSuffix": "M",
    "yaxismaxvalue": "200",
    "theme": "fusion",
    "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
  },
  "categories": [{
    "category": [{
      "label": "2014",
      "fontItalic": "0"
    }, {
      "label": "2015",
      "fontItalic": "0"
    }, {
      "label": "2016",
      "fontItalic": "0"
    }, {
      "label": "2017 (Projected)"
    }, {
      "label": "2018 (Projected)"
    }]
  }],
  "dataset": [{
    "seriesname": "Android Devices",
    "data": [{
      "value": "73",
      "alpha": "100",
      "allowDrag": "0"
    }, {
      "value": "80",
      "alpha": "100",
      "allowDrag": "0"
    }, {
      "value": "97",
      "alpha": "100",
      "allowDrag": "0"
    }, {
      "value": "110",
      "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
    }, {
      "value": "180",
      "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
    }]
  }, {
    "seriesname": "iOS Devices",
    "data": [{
      "value": "63.2",
      "alpha": "100",
      "allowDrag": "0"
    }, {
      "value": "68",
      "alpha": "100",
      "allowDrag": "0"
    }, {
      "value": "82",
      "alpha": "100",
      "allowDrag": "0"
    }, {
      "value": "99",
      "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
    }, {
      "value": "150",
      "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
    }]
  }]
}`;

export default {
  code,
  html,
  data
};
