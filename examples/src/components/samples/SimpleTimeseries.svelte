<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

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