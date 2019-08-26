<script>
  import FusionCharts from 'fusioncharts';
  import Widgets from 'fusioncharts/fusioncharts.widgets';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import dataSourceStore from '../utils/chart-viewer-data.js';

  FusionCharts.options.creditLabel = false;

  fcRoot(FusionCharts, Widgets, FusionTheme);

  let chartConfig = dataSourceStore['simple-gauge'];
</script>

<div id='chart-container' style='height: inherit;' >
  <SvelteFC {...chartConfig} />
</div>