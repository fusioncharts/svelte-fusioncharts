<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import Widgets from 'fusioncharts/fusioncharts.widgets';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../index.mjs';

  import { afterUpdate } from 'svelte';

  import dataSourceStore from './utils/chart-viewer-data.js';
  
  fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

  export let sampleId = 'simple-chart';

  let chartConfigs = {
      width: '100%',
      height: '100%',
      renderAt: 'chart-div'
    };

  afterUpdate(() => {
    chartConfigs = {
      ...chartConfigs,
      ...dataSourceStore[sampleId]
    }
  });
</script>

<SvelteFC {...chartConfigs} />