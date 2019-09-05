<script>
  import FusionCharts from 'fusioncharts';
  import Timeseries from 'fusioncharts/fusioncharts.timeseries';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Timeseries);

  let jsonify = res => res.json(),
    dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json'
    ).then(jsonify),
    schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json'
    ).then(jsonify),
    dataSource = {
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
    },
    chartConfig = {
      type: 'timeseries',
      width: '100%',
      height: 450,
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