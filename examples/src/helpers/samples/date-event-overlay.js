const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Timeseries);

  let jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/date-range-event-overlay-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/date-range-event-overlay-schema.json'
    ).then(jsonify),
    dataSource = {
      data: null,
      caption: {
        text: "Interest Rate Analysis"
      },
      subCaption: {
        text: "Federal Reserve (USA)"
      },
      yAxis: [
        {
          plot: "Interest Rate",
          format: {
            suffix: "%"
          },
          title: "Interest Rate"
        }
      ],
      xAxis: {
        plot: "Time",
        timemarker: [
          {
            start: "Jul-1981",
            end: "Nov-1982",
            label:
              "Economic downturn was triggered by {br} tight monetary policy in an effort to {br} fight mounting inflation.",
            timeFormat: "%b-%Y"
          },
          {
            start: "Jul-1990",
            end: "Mar-1991",
            label:
              "This eight month recession period {br} was characterized by a sluggish employment recovery, {br} most commonly referred to as a jobless recovery.",
            timeFormat: "%b-%Y"
          },
          {
            start: "Jun-2004",
            end: "Jul-2006",
            label:
              "The Fed after raising interest rates {br} at 17 consecutive meetings, ends its campaign {br} to slow the economy and forestall inflation.",
            timeFormat: "%b-%Y"
          },
          {
            start: "Dec-2007",
            end: "Jun-2009",
            label:
              "Recession caused by the worst {br} collapse of financial system in recent {br} times.",
            timeFormat: "%b-%Y"
          }
        ]
      }
    },
    chartConfig = {
      type: 'timeseries',
      width: '100%',
      height: '100%',
      renderAt: 'chart-container',
      dataSource 
    };

  Promise.all([dataFetch, schemaFetch]).then(res => {
    const data = res[0],
      schema = res[1],
      fusionDataStore = new FusionCharts.DataStore(),
      fusionTable = fusionDataStore.createDataTable(data, schema);

    chartConfig = {
      ...chartConfig,
      dataSource: {
        ...dataSource,
        data: fusionTable
      }
    };
  });
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>`,
data =
`// A shortened version of the data is given here.
// Please check the link below to see the complete data:
// https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/date-range-event-overlay-data.json
[
  [
    "Jan-1980",
    14
  ],
  [
    "Feb-1980",
    20
  ],
  [
    "Mar-1980",
    20
  ],
  [
    "Apr-1980",
    11.5
  ],
  [
    "May-1980",
    11.5
  ],
  [
    "Jun-1980",
    9.75
  ],
  [
    "Jul-1980",
    9.5
  ],
  [
    "Aug-1980",
    10
  ],
  [
    "Sep-1980",
    12
  ],
  [
    "Oct-1980",
    13.75
  ],
  [
    "Nov-1980",
    18
  ],
  [
    "Dec-1980",
    18
  ],
  [
    "Jan-1981",
    16
  ],
  [
    "Feb-1981",
    16
  ],
  [
    "Mar-1981",
    16
  ],
  [
    "Apr-1981",
    16
  ],
  [
    "May-1981",
    20
  ],
  [
    "Jun-1981",
    20
  ],
  [
    "Jul-1981",
    20
  ],
  [
    "Aug-1981",
    20
  ],
  [
    "Sep-1981",
    20
  ],
  [
    "Oct-1981",
    20
  ],
  [
    "Nov-1981",
    13
  ],
  [
    "Dec-1981",
    12
  ],
  [
    "Jan-1982",
    15
  ],
  [
    "Feb-1982",
    15
  ],
  [
    "Mar-1982",
    15
  ],
  [
    "Apr-1982",
    13
  ],
  [
    "May-1982",
    13
  ],
  [
    "Jun-1982",
    13
  ],
  [
    "Jul-1982",
    12
  ],
  [
    "Aug-1982",
    9.5
  ],
  [
    "Sep-1982",
    10
  ],
  [
    "Oct-1982",
    9.5
  ],
  [
    "Nov-1982",
    9
  ],
  [
    "Dec-1982",
    8.5
  ],
  [
    "Jan-1983",
    8.5
  ],
  [
    "Feb-1983",
    8.5
  ],
  [
    "Mar-1983",
    8.5
  ],
  [
    "Apr-1983",
    8.5
  ],
  [
    "May-1983",
    9.63
  ],
  [
    "Jun-1983",
    9.63
  ],
  [
    "Jul-1983",
    9.63
  ],
  [
    "Aug-1983",
    9.5
  ],
  [
    "Sep-1983",
    9.5
  ],
  [
    "Oct-1983",
    9.5
  ],
  [
    "Nov-1983",
    9.5
  ],
  [
    "Dec-1983",
    9.5
  ],
  [
    "Jan-1984",
    9.5
  ],
  [
    "Feb-1984",
    9.5
  ],
  [
    "Mar-1984",
    10.5
  ],
  [
    "Apr-1984",
    10.5
  ],
  [
    "May-1984",
    10.5
  ],
  [
    "Jun-1984",
    11
  ],
  [
    "Jul-1984",
    11.75
  ],
  [
    "Aug-1984",
    11.75
  ],
  [
    "Sep-1984",
    10
  ],
  [
    "Oct-1984",
    10
  ],
  [
    "Nov-1984",
    9
  ],
  [
    "Dec-1984",
    8.25
  ],
  [
    "Jan-1985",
    8.25
  ],
  [
    "Feb-1985",
    9
  ],
  [
    "Mar-1985",
    8.5
  ],
  [
    "Apr-1985",
    8.25
  ],
  [
    "May-1985",
    7.75
  ],
  [
    "Jun-1985",
    7.75
  ],
  [
    "Jul-1985",
    8
  ],
  [
    "Aug-1985",
    8
  ],
  [
    "Sep-1985",
    8
  ],
  [
    "Oct-1985",
    8
  ],
  [
    "Nov-1985",
    8
  ],
  [
    "Dec-1985",
    7.75
  ],
  [
    "Jan-1986",
    7.75
  ],
  [
    "Feb-1986",
    7.75
  ],
  [
    "Mar-1986",
    7.25
  ],
  [
    "Apr-1986",
    6.75
  ],
  [
    "May-1986",
    6.88
  ],
  [
    "Jun-1986",
    6.88
  ],
  [
    "Jul-1986",
    6.38
  ],
  [
    "Aug-1986",
    5.88
  ],
  [
    "Sep-1986",
    5.88
  ],
  [
    "Oct-1986",
    5.88
  ],
  [
    "Nov-1986",
    5.88
  ],
  [
    "Dec-1986",
    6
  ],
  [
    "Jan-1987",
    6
  ],
  [
    "Feb-1987",
    6
  ],
  [
    "Mar-1987",
    6
  ],
  [
    "Apr-1987",
    6.75
  ],
  [
    "May-1987",
    6.75
  ],
  [
    "Jun-1987",
    6.75
  ],
  [
    "Jul-1987",
    6.75
  ]
]`,
schema =
`[
  {
    "name": "Time",
    "type": "date",
    "format": "%b-%Y"
  },
  {
    "name": "Interest Rate",
    "type": "number"
  }
]`;

export default {
  code,
  html,
  data,
  schema
};
