const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-line-combination-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/column-line-combination-schema.json'
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
          text: 'Web visits & downloads'
        },
        subcaption: {
          text: 'since 2015'
        },
        yAxis: [
          {
            plot: [
              {
                value: 'Downloads',
                type: 'column'
              },
              {
                value: 'Web Visits',
                type: 'line'
              }
            ]
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
// https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-line-combination-data.json
[
  [
    "01-Jan-2015",
    "55",
    "100"
  ],
  [
    "02-Jan-2015",
    "56",
    "106"
  ],
  [
    "03-Jan-2015",
    "59",
    "108"
  ],
  [
    "04-Jan-2015",
    "50",
    "102"
  ],
  [
    "05-Jan-2015",
    "56",
    "108"
  ],
  [
    "06-Jan-2015",
    "48",
    "100"
  ],
  [
    "07-Jan-2015",
    "45",
    "97"
  ],
  [
    "08-Jan-2015",
    "56",
    "105"
  ],
  [
    "09-Jan-2015",
    "44",
    "95"
  ],
  [
    "10-Jan-2015",
    "48",
    "96"
  ],
  [
    "11-Jan-2015",
    "52",
    "104"
  ],
  [
    "12-Jan-2015",
    "59",
    "112"
  ],
  [
    "13-Jan-2015",
    "62",
    "118"
  ],
  [
    "14-Jan-2015",
    "56",
    "114"
  ],
  [
    "15-Jan-2015",
    "59",
    "115"
  ],
  [
    "16-Jan-2015",
    "64",
    "125"
  ],
  [
    "17-Jan-2015",
    "61",
    "122"
  ],
  [
    "18-Jan-2015",
    "65",
    "127"
  ],
  [
    "19-Jan-2015",
    "59",
    "126"
  ],
  [
    "20-Jan-2015",
    "75",
    "138"
  ],
  [
    "21-Jan-2015",
    "58",
    "124"
  ],
  [
    "22-Jan-2015",
    "72",
    "134"
  ],
  [
    "23-Jan-2015",
    "64",
    "132"
  ],
  [
    "24-Jan-2015",
    "75",
    "143"
  ],
  [
    "25-Jan-2015",
    "66",
    "133"
  ],
  [
    "26-Jan-2015",
    "70",
    "134"
  ],
  [
    "27-Jan-2015",
    "64",
    "133"
  ],
  [
    "28-Jan-2015",
    "63",
    "128"
  ],
  [
    "29-Jan-2015",
    "69",
    "135"
  ],
  [
    "30-Jan-2015",
    "62",
    "129"
  ],
  [
    "31-Jan-2015",
    "71",
    "136"
  ],
  [
    "01-Feb-2015",
    "76",
    "148"
  ],
  [
    "02-Feb-2015",
    "85",
    "156"
  ],
  [
    "03-Feb-2015",
    "86",
    "156"
  ],
  [
    "04-Feb-2015",
    "86",
    "169"
  ],
  [
    "05-Feb-2015",
    "93",
    "180"
  ],
  [
    "06-Feb-2015",
    "95",
    "185"
  ],
  [
    "07-Feb-2015",
    "100",
    "189"
  ],
  [
    "08-Feb-2015",
    "103",
    "194"
  ],
  [
    "09-Feb-2015",
    "96",
    "193"
  ],
  [
    "10-Feb-2015",
    "82",
    "174"
  ],
  [
    "11-Feb-2015",
    "97",
    "183"
  ],
  [
    "12-Feb-2015",
    "79",
    "175"
  ],
  [
    "13-Feb-2015",
    "74",
    "161"
  ],
  [
    "14-Feb-2015",
    "67",
    "149"
  ],
  [
    "15-Feb-2015",
    "76",
    "150"
  ],
  [
    "16-Feb-2015",
    "68",
    "144"
  ],
  [
    "17-Feb-2015",
    "76",
    "147"
  ]
]`,
schema =
`[
  {
    "name": "Time",
    "type": "date",
    "format": "%e-%b-%Y"
  },
  {
    "name": "Downloads",
    "type": "number"
  },
  {
    "name": "Web Visits",
    "type": "number"
  }
]`;

export default {
  code,
  html,
  data,
  schema
};
