const
code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-chart-with-time-axis-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/column-chart-with-time-axis-schema.json'
    ).then(jsonify);

  promise = Promise.all([dataFetch, schemaFetch]);
  
  const getChartConfig = ([data, schema]) => {
    const fusionDataStore = new FusionCharts.DataStore(),
      fusionTable = fusionDataStore.createDataTable(data, schema);

    return {
      type: 'timeseries',
      width: '100%',
      height: 450,
      renderAt: 'chart-container',
      dataSource: {
        data: fusionTable,
        chart: {
          showLegend: 0
        },
        caption: {
          text: 'Daily Visitors Count of a Website'
        },
        yAxis: [
          {
            plot: {
              value: 'Daily Visitors',
              type: 'column'
            },
            title: 'Daily Visitors (in thousand)'
          }
        ]
      }
    };
  };
</script>`,
html =
`<div id="chart-container" >
  {#await promise}
    <p>Fetching data and schema...</p>
  {:then value}
    <SvelteFC
      {...getChartConfig(value)}
    />
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>`,
data =
`// A shortened version of the data is given here.
// Please check the link below to see the complete data:
// https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-chart-with-time-axis-data.json
[
  [
    "2016-01-01",
    5
  ],
  [
    "2016-01-02",
    90
  ],
  [
    "2016-01-03",
    19
  ],
  [
    "2016-01-04",
    74
  ],
  [
    "2016-01-05",
    81
  ],
  [
    "2016-01-06",
    48
  ],
  [
    "2016-01-07",
    60
  ],
  [
    "2016-01-08",
    18
  ],
  [
    "2016-01-09",
    36
  ],
  [
    "2016-01-10",
    53
  ],
  [
    "2016-01-11",
    15
  ],
  [
    "2016-01-12",
    34
  ],
  [
    "2016-01-13",
    71
  ],
  [
    "2016-01-14",
    47
  ],
  [
    "2016-01-15",
    35
  ],
  [
    "2016-01-16",
    99
  ],
  [
    "2016-01-17",
    79
  ],
  [
    "2016-01-18",
    25
  ],
  [
    "2016-01-19",
    14
  ],
  [
    "2016-01-20",
    16
  ],
  [
    "2016-01-21",
    79
  ],
  [
    "2016-01-22",
    15
  ],
  [
    "2016-01-23",
    94
  ],
  [
    "2016-01-24",
    77
  ],
  [
    "2016-01-25",
    38
  ],
  [
    "2016-01-26",
    17
  ],
  [
    "2016-01-27",
    24
  ],
  [
    "2016-01-28",
    53
  ],
  [
    "2016-01-29",
    52
  ],
  [
    "2016-01-30",
    76
  ],
  [
    "2016-01-31",
    86
  ],
  [
    "2016-02-01",
    71
  ],
  [
    "2016-02-02",
    84
  ],
  [
    "2016-02-03",
    3
  ],
  [
    "2016-02-04",
    86
  ],
  [
    "2016-02-05",
    86
  ],
  [
    "2016-02-06",
    93
  ],
  [
    "2016-02-07",
    66
  ],
  [
    "2016-02-08",
    18
  ],
  [
    "2016-02-09",
    95
  ],
  [
    "2016-02-10",
    21
  ],
  [
    "2016-02-11",
    19
  ],
  [
    "2016-02-12",
    28
  ],
  [
    "2016-02-13",
    36
  ],
  [
    "2016-02-14",
    95
  ],
  [
    "2016-02-15",
    83
  ],
  [
    "2016-02-16",
    43
  ],
  [
    "2016-02-17",
    19
  ],
  [
    "2016-02-18",
    46
  ],
  [
    "2016-02-19",
    75
  ],
  [
    "2016-02-20",
    61
  ],
  [
    "2016-02-21",
    54
  ],
  [
    "2016-02-22",
    96
  ],
  [
    "2016-02-23",
    56
  ],
  [
    "2016-02-24",
    78
  ],
  [
    "2016-02-25",
    32
  ],
  [
    "2016-02-26",
    39
  ],
  [
    "2016-02-27",
    7
  ],
  [
    "2016-02-28",
    92
  ],
  [
    "2016-02-29",
    18
  ],
  [
    "2016-03-01",
    33
  ],
  [
    "2016-03-02",
    32
  ],
  [
    "2016-03-03",
    49
  ],
  [
    "2016-03-04",
    59
  ],
  [
    "2016-03-05",
    42
  ],
  [
    "2016-03-06",
    94
  ],
  [
    "2016-03-07",
    15
  ],
  [
    "2016-03-08",
    31
  ],
  [
    "2016-03-09",
    32
  ],
  [
    "2016-03-10",
    93
  ],
  [
    "2016-03-11",
    53
  ]
]`,
schema =
`[
  {
    "name": "Time",
    "type": "date",
    "format": "%Y-%m-%d"
  },
  {
    "name": "Daily Visitors",
    "type": "number"
  }
]`;

export default {
  code,
  html,
  data,
  schema
};
