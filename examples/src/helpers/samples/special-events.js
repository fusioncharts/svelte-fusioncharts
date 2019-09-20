const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
  import dataSource from './data.js';

  import { onDestroy } from 'svelte';

  fcRoot(FusionCharts, PowerCharts, FusionTheme);

  let para,
    chartObj,
    chartConfig = {
      type: 'dragcolumn2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataSource
    };

  const dragEndHandler = customEvent => {
    let args = customEvent.detail.data,
      prevValue = chartObj.formatNumber(args.startValue.toFixed(2)),
      curValue = chartObj.formatNumber(args.endValue.toFixed(2)),
      label = dataSource.categories[0].category[args.dataIndex].label;

    para.innerHTML = '<b>' + args.datasetName + '</b> dataset, its previous value was <b>'+ prevValue +'</b> and its current value is <b>' + curValue + '</b> for year ' +
      '<b>'+ label + '</b>';
  };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC
    bind:chart={chartObj}
    {...chartConfig}
    on:dataplotDragEnd={dragEndHandler}
  />
</div>
<div>
  <p bind:this={para} id="message" style="padding: 10px; background: rgb(245, 242, 240);" >
    Drag any column for years 2017 or 2018 to see updated value along with the label
  </p>
</div>`,
data =
`export default {
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
