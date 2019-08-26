<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Timeseries);

  let jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/area-chart-with-time-axis-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/area-chart-with-time-axis-schema.json'
    ).then(jsonify),
    dataSource = {
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
            type: 'area'
          },
          title: 'Daily Visitors (in thousand)'
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