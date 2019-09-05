const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
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
        caption: {
          text: 'Sales Analysis'
        },
        subcaption: {
          text: 'Grocery'
        },
        yAxis: [
          {
            plot: {
              value: 'Grocery Sales Value',
              type: 'line'
            },
            format: {
              prefix: '$'
            },
            title: 'Sale Value'
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
// https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json
[
  [
    "01-Feb-11",
    8866
  ],
  [
    "02-Feb-11",
    2174
  ],
  [
    "03-Feb-11",
    2084
  ],
  [
    "04-Feb-11",
    1503
  ],
  [
    "05-Feb-11",
    4928
  ],
  [
    "06-Feb-11",
    4667
  ],
  [
    "07-Feb-11",
    1064
  ],
  [
    "08-Feb-11",
    851
  ],
  [
    "09-Feb-11",
    7326
  ],
  [
    "10-Feb-11",
    8399
  ],
  [
    "11-Feb-11",
    4084
  ],
  [
    "12-Feb-11",
    4012
  ],
  [
    "13-Feb-11",
    1673
  ],
  [
    "14-Feb-11",
    6018
  ],
  [
    "15-Feb-11",
    9011
  ],
  [
    "16-Feb-11",
    5817
  ],
  [
    "17-Feb-11",
    5813
  ],
  [
    "18-Feb-11",
    566
  ],
  [
    "19-Feb-11",
    9065
  ],
  [
    "20-Feb-11",
    6734
  ],
  [
    "21-Feb-11",
    6937
  ],
  [
    "22-Feb-11",
    3038
  ],
  [
    "23-Feb-11",
    4445
  ],
  [
    "24-Feb-11",
    8782
  ],
  [
    "25-Feb-11",
    9489
  ],
  [
    "26-Feb-11",
    9624
  ],
  [
    "27-Feb-11",
    9033
  ],
  [
    "28-Feb-11",
    6932
  ],
  [
    "01-Mar-11",
    625
  ],
  [
    "02-Mar-11",
    904
  ],
  [
    "03-Mar-11",
    7572
  ],
  [
    "04-Mar-11",
    2124
  ],
  [
    "05-Mar-11",
    8157
  ],
  [
    "06-Mar-11",
    8666
  ],
  [
    "07-Mar-11",
    3186
  ],
  [
    "08-Mar-11",
    9247
  ],
  [
    "09-Mar-11",
    8393
  ],
  [
    "10-Mar-11",
    9191
  ],
  [
    "11-Mar-11",
    1278
  ],
  [
    "12-Mar-11",
    7252
  ],
  [
    "13-Mar-11",
    6516
  ],
  [
    "14-Mar-11",
    8176
  ],
  [
    "15-Mar-11",
    5759
  ],
  [
    "16-Mar-11",
    7601
  ],
  [
    "17-Mar-11",
    3616
  ],
  [
    "18-Mar-11",
    9612
  ],
  [
    "19-Mar-11",
    2631
  ],
  [
    "20-Mar-11",
    4939
  ],
  [
    "21-Mar-11",
    3578
  ],
  [
    "22-Mar-11",
    3742
  ],
  [
    "23-Mar-11",
    5100
  ],
  [
    "24-Mar-11",
    6925
  ],
  [
    "25-Mar-11",
    5239
  ],
  [
    "26-Mar-11",
    1461
  ],
  [
    "27-Mar-11",
    2317
  ],
  [
    "28-Mar-11",
    8238
  ],
  [
    "29-Mar-11",
    3617
  ],
  [
    "30-Mar-11",
    8680
  ],
  [
    "31-Mar-11",
    8487
  ],
  [
    "01-Apr-11",
    1768
  ],
  [
    "02-Apr-11",
    1227
  ],
  [
    "03-Apr-11",
    4137
  ],
  [
    "04-Apr-11",
    9055
  ],
  [
    "05-Apr-11",
    4984
  ],
  [
    "06-Apr-11",
    1577
  ],
  [
    "07-Apr-11",
    6624
  ],
  [
    "08-Apr-11",
    5802
  ],
  [
    "09-Apr-11",
    5190
  ],
  [
    "10-Apr-11",
    3092
  ],
  [
    "11-Apr-11",
    7304
  ],
  [
    "12-Apr-11",
    3445
  ],
  [
    "13-Apr-11",
    1480
  ],
  [
    "14-Apr-11",
    3705
  ],
  [
    "15-Apr-11",
    7795
  ],
  [
    "16-Apr-11",
    7405
  ],
  [
    "17-Apr-11",
    3901
  ],
  [
    "18-Apr-11",
    4428
  ],
  [
    "19-Apr-11",
    8874
  ],
  [
    "20-Apr-11",
    3072
  ],
  [
    "21-Apr-11",
    6340
  ],
  [
    "22-Apr-11",
    2275
  ],
  [
    "23-Apr-11",
    8934
  ],
  [
    "24-Apr-11",
    7595
  ],
  [
    "25-Apr-11",
    3869
  ],
  [
    "26-Apr-11",
    7395
  ],
  [
    "27-Apr-11",
    7812
  ],
  [
    "28-Apr-11",
    9642
  ],
  [
    "29-Apr-11",
    6925
  ],
  [
    "30-Apr-11",
    8537
  ],
  [
    "01-May-11",
    2985
  ]
]`,
schema =
`[
  {
      "name": "Time",
      "type": "date",
      "format": "%d-%b-%y"
  },
  {
    "name": "Grocery Sales Value",
    "type": "number"
  }
]`;

export default {
  code,
  html,
  data,
  schema
};
