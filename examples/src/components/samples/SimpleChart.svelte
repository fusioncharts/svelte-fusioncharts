<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import dataSourceStore from '../utils/chart-viewer-data.js';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartConfig = dataSourceStore['simple-chart'];
</script>

<SvelteFC {...chartConfig} />