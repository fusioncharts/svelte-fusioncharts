<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/date-range-event-overlay-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/date-range-event-overlay-schema.json'
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
      }
    };
  };
</script>

<div id='chart-container' style='height: inherit;' >
  {#await promise}
    <p>Fetching data and schema...</p>
  {:then value}
    <SvelteFC
      {...getChartConfig(value)}
    />
  {:catch error}
    <p>Something went wrong: {error.message}</p>
  {/await}
</div>