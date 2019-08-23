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
  'simple-gauge': {
    type: 'angulargauge',
    dataSource: {
      "chart": {
        "caption": "Nordstorm's Customer Satisfaction Score for 2017",
        "lowerLimit": "0",
        "upperLimit": "100",
        "showValue": "1",
        "numberSuffix": "%",
        "theme": "fusion",
        "showToolTip": "0"
      },
      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": "50",
          "code": "#F2726F"
        }, {
          "minValue": "50",
          "maxValue": "75",
          "code": "#FFC533"
        }, {
          "minValue": "75",
          "maxValue": "100",
          "code": "#62B58F"
        }]
      },
      "dials": {
        "dial": [{
          "value": "81"
        }]
      }
    }
  },
  'column-line-area-combi-chart': {
    type: 'mscombi2d',
    dataSource: {
      "chart": {
        "caption": "Expense Analysis",
        "subCaption": "ACME Inc.",
        "xAxisname": "Region",
        "yAxisName": "Amount (In USD)",
        "numberPrefix": "$",
        "theme": "fusion"
      },
      "categories": [{
        "category": [{
          "label": "East"
        }, {
          "label": "West"
        }, {
          "label": "South"
        }, {
          "label": "North"
        }]
      }],
      "dataset": [{
        "seriesName": "Actual Expenses",
        "data": [{
          "value": "1441290"
        }, {
          "value": "855912"
        }, {
          "value": "911404"
        }, {
          "value": "648136"
        }]
      }, {
        "seriesName": "Budgeted Expenses",
        "renderAs": "line",
        "data": [{
          "value": "1297430"
        }, {
          "value": "776485"
        }, {
          "value": "685352"
        }, {
          "value": "726791"
        }]
      }, {
        "seriesName": "Unknown liabilities",
        "renderAs": "area",
        "showAnchors": "0",
        "data": [{
          "value": "143860"
        }, {
          "value": "79427"
        }, {
          "value": "226052"
        }, {
          "value": "78655"
        }]
      }]
    }
  },
  'column-chart-time-axis': {},
  'multi-series-time-axis': {},
  'multivariate-timeseries': {},
  'fetch-data-from-json-url': {
    type: 'column2d',
    dataFormat: 'jsonurl',
    dataSource: 'https://static.fusioncharts.com/sample/oilReserves.json'
  },
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