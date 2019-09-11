<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let xmlUrl = 'https://static.fusioncharts.com/sample/oilReserves.xml',
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '100%',
      height: 450,
      dataFormat: 'xmlurl',
      dataSource: xmlUrl
    };
</script>

<div id='chart-container' style='height: inherit;' >
  <SvelteFC {...chartConfig} />
</div>