export default {
  'simple-chart': {
    type: 'column2d',
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
  },
  'simple-timeseries': {},
  'column-time-axis': {},
  'area-time-axis': {},
  '3d-pie-chart': {
    type: 'pie3d',
    dataSource: {
      "chart": {
        "caption": "Recommended Portfolio Split",
        "subCaption": "For a net-worth of $1M",
        "showValues": "1",
        "showPercentInTooltip": "0",
        "numberPrefix": "$",
        "enableMultiSlicing": "1",
        "theme": "fusion"
      },
      "data": [{
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
      }]
    }
  },
  'column-line-area-combi-chart': {},
  'column-chart-time-axis': {},
  'multi-series-time-axis': {},
  'multivariate-timeseries': {},
  'fetch-data-from-json-url': {},
  'fetch-data-from-xml-url': {},
  'update-chart-data': {},
  'update-chart-attributes': {},
  'trigger-events-from-chart': {},
  'percentage-calculation': {},
  'drill-down': {},
  'adding-reference-line': {},
  'annotating-data': {},
  'single-event-overlay': {},
  'date-event-overlay': {},
  'export-charts': {},
  'world-map': {},
  'special-events': {},
  'render-alert': {},
  'dynamically-add-chart': {},
  'slice-data-plots': {},
  'responsive-charts': {},
  'change-chart-type': {},
  'use-annotations': {},
  'update-chart-attribute-through-method': {},
  'apply-theme': {},
  'interactive-candlestick-chart': {},
};