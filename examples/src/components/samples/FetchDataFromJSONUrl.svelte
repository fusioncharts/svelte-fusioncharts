<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  import dataSourceStore from '../utils/chart-viewer-data.js';

  FusionCharts.options.creditLabel = false;

  fcRoot(FusionCharts, Charts, FusionTheme);

  let jsonUrl = 'https://static.fusioncharts.com/sample/oilReserves.json',
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '100%',
      height: '100%',
      dataFormat: 'jsonurl',
      dataSource: jsonUrl
    };
</script>

<div id='chart-container' style='height: inherit;' >
  <SvelteFC {...chartConfig} />
</div>