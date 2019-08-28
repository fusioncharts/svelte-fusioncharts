const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Timeseries);

  let jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/single-event-overlay-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/single-event-overlay-schema.json'
    ).then(jsonify),
    dataSource = {
      data: null,
      caption: {
        text: 'Interest Rate Analysis'
      },
      subCaption: {
        text: 'Federal Reserve (USA)'
      },
      yAxis: [{
        plot: 'Interest Rate',
        format: {
          suffix: '%'
        },
        title: 'Interest Rate'
      }],
      xAxis: {
        plot: 'Time',
        timemarker: [{
          start: 'Mar-1980',
          label: 'US inflation peaked at 14.8%.',
          timeFormat: "%b-%Y",
          style: {
            marker: {
              fill: '#D0D6F4'
            }
          }
        }, {
          start: 'May-1981',
          label: 'To control inflation, the Fed started {br} raising interest rates to over {br} 20%.',
          timeFormat: "%b-%Y"
        }, {
          start: 'Jun-1983',
          label: 'By proactive actions of Mr.Volcker, {br} the inflation falls to 2.4% {br} from the peak of over 14% {br} just three years ago.',
          timeFormat: "%b-%Y",
          style: {
            marker: {
              fill: '#D0D6F4'
            }
          }
        }, {
          start: 'Oct-1987',
          label: 'The Dow Jones Industrial Average lost {br} about 30% of it’s value.',
          timeFormat: "%b-%Y",
          style: {
            marker: {
              fill: '#FBEFCC'
            }
          }
        }, {
          start: 'Jan-1989',
          label: 'George H.W. Bush becomes {br} the 41st president of US!',
          timeFormat: "%b-%Y"
        }, {
          start: 'Aug-1990',
          label: 'The oil prices spiked to $35 {br} per barrel from $15 per barrel {br} because of the Gulf War.',
          timeFormat: "%b-%Y"
        }, {
          start: 'Dec-1996',
          label: 'Alan Greenspan warns of the dangers {br} of "irrational exuberance" in financial markets, {br} an admonition that goes unheeded',
          timeFormat: "%b-%Y"
        }, {
          start: 'Sep-2008',
          label: 'Lehman Brothers collapsed!',
          timeFormat: "%b-%Y"
        }, {
          start: 'Mar-2009',
          label: 'The net worth of US households {br} stood at a trough of $55 trillion.',
          timeFormat: "%b-%Y",
          style: {
            marker: {
              fill: '#FBEFCC'
            }
          }
        }, {
          start: 'Oct-2009',
          label: 'Unemployment rate peaked {br} in given times to 10%.',
          timeFormat: "%b-%Y"
        }]
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
// https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/single-event-overlay-data.json
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
    "Dec-2001",
    1.75
  ],
  [
    "Jan-2002",
    1.75
  ],
  [
    "Feb-2002",
    1.75
  ],
  [
    "Mar-2002",
    1.75
  ],
  [
    "Apr-2002",
    1.75
  ],
  [
    "May-2002",
    1.75
  ],
  [
    "Jun-2002",
    1.75
  ],
  [
    "Jul-2002",
    1.75
  ],
  [
    "Aug-2002",
    1.75
  ],
  [
    "Sep-2002",
    1.75
  ],
  [
    "Oct-2002",
    1.75
  ],
  [
    "Nov-2002",
    1.25
  ],
  [
    "Dec-2002",
    1.25
  ],
  [
    "Jan-2003",
    1.25
  ],
  [
    "Feb-2003",
    1.25
  ],
  [
    "Mar-2003",
    1.25
  ],
  [
    "Apr-2003",
    1.25
  ],
  [
    "May-2003",
    1.25
  ],
  [
    "Jun-2003",
    1
  ],
  [
    "Jul-2003",
    1
  ],
  [
    "Aug-2003",
    1
  ],
  [
    "Sep-2003",
    1
  ],
  [
    "Oct-2003",
    1
  ],
  [
    "Nov-2003",
    1
  ],
  [
    "Dec-2003",
    1
  ],
  [
    "Jan-2004",
    1
  ],
  [
    "Feb-2004",
    1
  ],
  [
    "Mar-2004",
    1
  ],
  [
    "Apr-2004",
    1
  ],
  [
    "May-2004",
    1
  ],
  [
    "Jun-2004",
    1.25
  ],
  [
    "Jul-2004",
    1.25
  ],
  [
    "Aug-2004",
    1.5
  ],
  [
    "Sep-2004",
    1.75
  ],
  [
    "Oct-2004",
    1.75
  ],
  [
    "Nov-2004",
    2
  ],
  [
    "Dec-2004",
    2.25
  ],
  [
    "Jan-2005",
    2.25
  ],
  [
    "Feb-2005",
    2.5
  ],
  [
    "Mar-2005",
    2.75
  ],
  [
    "Apr-2005",
    2.75
  ],
  [
    "May-2005",
    3
  ],
  [
    "Jun-2005",
    3.25
  ],
  [
    "Jul-2005",
    3.25
  ],
  [
    "Aug-2005",
    3.5
  ],
  [
    "Sep-2005",
    3.75
  ],
  [
    "Oct-2005",
    3.75
  ],
  [
    "Nov-2005",
    4
  ],
  [
    "Dec-2005",
    4.25
  ],
  [
    "Jan-2006",
    4.5
  ],
  [
    "Feb-2006",
    4.5
  ],
  [
    "Mar-2006",
    4.75
  ],
  [
    "Apr-2006",
    4.75
  ],
  [
    "May-2006",
    5
  ],
  [
    "Jun-2006",
    5.25
  ],
  [
    "Jul-2006",
    5.25
  ],
  [
    "Aug-2006",
    5.25
  ],
  [
    "Sep-2006",
    5.25
  ],
  [
    "Oct-2006",
    5.25
  ],
  [
    "Nov-2006",
    5.25
  ],
  [
    "Dec-2006",
    5.25
  ],
  [
    "Jan-2007",
    5.25
  ],
  [
    "Feb-2007",
    5.25
  ],
  [
    "Mar-2007",
    5.25
  ],
  [
    "Apr-2007",
    5.25
  ],
  [
    "May-2007",
    5.25
  ],
  [
    "Jun-2007",
    5.25
  ],
  [
    "Jul-2007",
    5.25
  ],
  [
    "Aug-2007",
    5.25
  ],
  [
    "Sep-2007",
    4.75
  ],
  [
    "Oct-2007",
    4.5
  ],
  [
    "Nov-2007",
    4.5
  ],
  [
    "Dec-2007",
    4.25
  ],
  [
    "Jan-2008",
    3
  ],
  [
    "Feb-2008",
    3
  ],
  [
    "Mar-2008",
    2.25
  ],
  [
    "Apr-2008",
    2
  ],
  [
    "May-2008",
    2
  ],
  [
    "Jun-2008",
    2
  ],
  [
    "Jul-2008",
    2
  ],
  [
    "Aug-2008",
    2
  ],
  [
    "Sep-2008",
    2
  ],
  [
    "Oct-2008",
    1
  ],
  [
    "Nov-2008",
    1
  ],
  [
    "Dec-2008",
    0.125
  ],
  [
    "Jan-2009",
    0.125
  ],
  [
    "Feb-2009",
    0.125
  ],
  [
    "Mar-2009",
    0.125
  ],
  [
    "Apr-2009",
    0.125
  ],
  [
    "May-2009",
    0.125
  ],
  [
    "Jun-2009",
    0.125
  ],
  [
    "Jul-2009",
    0.125
  ],
  [
    "Aug-2009",
    0.125
  ],
  [
    "Sep-2009",
    0.125
  ],
  [
    "Oct-2009",
    0.125
  ],
  [
    "Nov-2009",
    0.125
  ],
  [
    "Dec-2009",
    0.125
  ],
  [
    "Jan-2010",
    0.125
  ],
  [
    "Feb-2010",
    0.125
  ],
  [
    "Mar-2010",
    0.125
  ],
  [
    "Apr-2010",
    0.125
  ],
  [
    "May-2010",
    0.125
  ],
  [
    "Jun-2010",
    0.125
  ],
  [
    "Jul-2010",
    0.125
  ],
  [
    "Aug-2010",
    0.125
  ],
  [
    "Sep-2010",
    0.125
  ],
  [
    "Oct-2010",
    0.125
  ],
  [
    "Nov-2010",
    0.125
  ],
  [
    "Dec-2010",
    0.125
  ],
  [
    "Jan-2011",
    0.125
  ],
  [
    "Feb-2011",
    0.125
  ],
  [
    "Mar-2011",
    0.125
  ],
  [
    "Apr-2011",
    0.125
  ],
  [
    "May-2011",
    0.125
  ],
  [
    "Jun-2011",
    0.125
  ],
  [
    "Jul-2011",
    0.125
  ],
  [
    "Aug-2011",
    0.125
  ],
  [
    "Sep-2011",
    0.125
  ],
  [
    "Oct-2011",
    0.125
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
