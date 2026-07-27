<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../src/index.svelte';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let xmlUrl = 'https://cdn.fusioncharts.com/samples/data/oil-reserves.xml',
    chartConfig = {
      type: 'column2d',
      width: '100%',
      height: 450,
      dataFormat: 'xmlurl',
      dataSource: xmlUrl
    };
</script>

<div id='chart-container' style='height: inherit;' >
  <SvelteFC {...chartConfig} />
</div>