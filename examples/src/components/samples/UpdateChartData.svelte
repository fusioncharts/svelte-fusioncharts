<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import dataSourceStore from '../utils/chart-viewer-data.js';
  import { sampleNames } from '../utils/constants.js';

  FusionCharts.options.creditLabel = false;

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartConfig = dataSourceStore[sampleNames.UPDATECHARTDATA];
</script>

<SvelteFC {...chartConfig} />
<div style="text-align: center;">
  <button class="btn btn-outline-secondary btn-sm">Click to Update Data</button>
</div>