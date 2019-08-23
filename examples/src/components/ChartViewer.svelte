<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../index.mjs';

  import { beforeUpdate, afterUpdate } from 'svelte';

  import dataSourceStore from './utils/chart-viewer-data.js';
  
  fcRoot(FusionCharts, Charts, FusionTheme);

  export let sampleId = 'simple-chart';

  let chartConfigs = {
      type: 'column2d',
      width: '100%',
      height: '100%',
      renderAt: 'chart-div',
      dataSource: dataSourceStore[sampleId].data
    };

  afterUpdate(() => {
    chartConfigs = {
      ...chartConfigs,
      ...dataSourceStore[sampleId]
    }
    console.log(chartConfigs);
  });
</script>

<SvelteFC {...chartConfigs} />