const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json'
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
          text: 'Cariaco Basin Sampling'
        },
        subcaption: {
          text: 'Analysis of O₂ Concentration and Surface Temperature'
        },
        yAxis: [
          {
            plot: 'O2 concentration',
            min: '3',
            max: '6',
            title: 'O₂ Concentration (mg/L)'
          },
          {
            plot: 'Surface Temperature',
            min: '18',
            max: '30',
            title: 'Surface Temperature (°C)'
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
// https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json
[
  [
    "11/08/1995",
    4.85,
    27.49
  ],
  [
    "12/13/1995",
    4.07,
    25.39
  ],
  [
    "1/12/1996",
    4.66,
    24.48
  ],
  [
    "2/13/1996",
    4.77,
    24.05
  ],
  [
    "3/13/1996",
    5.6,
    22.869
  ],
  [
    "4/16/1996",
    5.47,
    22.999
  ],
  [
    "5/09/1996",
    4.97,
    23.189
  ],
  [
    "6/12/1996",
    4.83,
    25.43
  ],
  [
    "7/10/1996",
    4.53,
    27.67
  ],
  [
    "8/06/1996",
    4.29,
    26.25
  ],
  [
    "9/10/1996",
    4.25,
    29.102
  ],
  [
    "10/09/1996",
    4.45,
    27.536
  ],
  [
    "11/10/1996",
    4.51,
    26.316
  ],
  [
    "12/11/1996",
    4.5,
    26.501
  ],
  [
    "1/07/1997",
    4.98,
    24.19
  ],
  [
    "2/13/1997",
    4.84,
    23.92
  ],
  [
    "3/13/1997",
    5.46,
    22.465
  ],
  [
    "4/15/1997",
    4.94,
    23.227
  ],
  [
    "5/10/1997",
    5,
    24.328
  ],
  [
    "6/17/1997",
    4.66,
    25.225
  ],
  [
    "7/08/1997",
    4.94,
    24.966
  ],
  [
    "8/17/1997",
    5.03,
    24.599
  ],
  [
    "9/17/1997",
    5.55,
    28.71
  ],
  [
    "6/09/2011",
    4.5,
    29.085
  ],
  [
    "7/07/2011",
    4.43,
    27.243
  ],
  [
    "8/09/2011",
    4.47,
    28.175
  ],
  [
    "9/06/2011",
    4.45,
    29.541
  ],
  [
    "10/04/2011",
    4.43,
    27.971
  ],
  [
    "11/18/2011",
    4.64,
    28.594
  ],
  [
    "1/10/2012",
    4.62,
    25.213
  ],
  [
    "2/07/2012",
    4.89,
    23.021
  ],
  [
    "3/16/2012",
    5.7,
    22.581
  ],
  [
    "4/10/2012",
    4.82,
    24.799
  ],
  [
    "5/15/2012",
    4.61,
    27.182
  ],
  [
    "7/26/2012",
    4.67,
    26.847
  ],
  [
    "8/14/2012",
    4.53,
    28.239
  ],
  [
    "9/10/2012",
    4.47,
    27.837
  ],
  [
    "10/10/2012",
    4.49,
    28.538
  ],
  [
    "11/08/2012",
    4.4,
    28.759
  ],
  [
    "12/04/2012",
    4.4,
    26.816
  ],
  [
    "3/05/2013",
    4.69,
    24.698
  ],
  [
    "4/09/2013",
    4.55,
    24.767
  ],
  [
    "5/09/2013",
    4.28,
    25.422
  ],
  [
    "6/11/2013",
    4.54,
    26.647
  ],
  [
    "7/11/2013",
    4.28,
    27.881
  ],
  [
    "8/13/2013",
    4.39,
    ""
  ],
  [
    "9/11/2013",
    4.48,
    29.359
  ],
  [
    "10/08/2013",
    4.42,
    29.103
  ],
  [
    "11/13/2013",
    4.44,
    27.268
  ],
  [
    "12/04/2013",
    4.53,
    26.727
  ],
  [
    "1/14/2014",
    4.83,
    23.104
  ],
  [
    "2/04/2014",
    4.95,
    22.282
  ],
  [
    "4/01/2014",
    5.49,
    23.25
  ],
  [
    "5/06/2014",
    5.33,
    23.566
  ],
  [
    "6/13/2014",
    4.7,
    25.103
  ],
  [
    "9/03/2014",
    4.52,
    28.015
  ],
  [
    "10/07/2014",
    4.45,
    27.054
  ],
  [
    "11/12/2014",
    4.5,
    27.328
  ],
  [
    "12/04/2014",
    4.65,
    26.277
  ],
  [
    "2/15/2015",
    4.65,
    25.931
  ],
  [
    "3/10/2015",
    4.62,
    23.631
  ],
  [
    "4/24/2015",
    4.86,
    23.4
  ],
  [
    "7/29/2015",
    4.7,
    25.298
  ],
  [
    "8/18/2015",
    4.34,
    25.363
  ],
  [
    "9/10/2015",
    4.44,
    26.631
  ],
  [
    "11/16/2015",
    4.47,
    25.904
  ],
  [
    "12/09/2015",
    "",
    25.668
  ],
  [
    "1/12/2016",
    4.84,
    24.311
  ],
  [
    "2/04/2016",
    4.85,
    24.475
  ],
  [
    "5/11/2016",
    4.48,
    26.409
  ],
  [
    "6/07/2016",
    4.52,
    ""
  ],
  [
    "9/20/2016",
    4.59,
    28.673
  ],
  [
    "12/21/2016",
    4.55,
    26.626
  ]
]`,
schema =
`[
  {
    "name": "Date",
    "type": "date",
    "format": "%-m/%d/%Y"
  },
  {
    "name": "O2 concentration",
    "type": "number"
  },
  {
    "name": "Surface Temperature",
    "type": "number"
  }
]`;

export default {
  code,
  html,
  data,
  schema
};
