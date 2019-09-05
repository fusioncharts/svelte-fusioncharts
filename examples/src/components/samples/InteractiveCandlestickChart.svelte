<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Timeseries);

  let promise,
    jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json'
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
          text: "Apple Inc. Stock Price"
        },
        subcaption: {
          text: "Stock prices from January 1980 - November 2011"
        },
        yaxis: [
          {
            plot: {
              value: {
                open: "Open",
                high: "High",
                low: "Low",
                close: "Close"
              },
              type: "candlestick"
            },
            format: {
              prefix: "$"
            },
            title: "Stock Value"
          }
        ]
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