<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Timeseries);

  let jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-line-combination-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/column-line-combination-schema.json'
    ).then(jsonify),
    dataSource = {
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
</script>

<div id='chart-container' style='height: inherit;' >
  <SvelteFC {...chartConfig} />
</div>