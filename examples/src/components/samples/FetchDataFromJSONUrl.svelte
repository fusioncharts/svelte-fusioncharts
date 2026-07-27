<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../src/index.svelte';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let jsonUrl = 'https://cdn.fusioncharts.com/samples/data/oil-reserves.json',
    chartConfig = {
      type: 'column2d',
      width: '100%',
      height: 450,
      dataFormat: 'jsonurl',
      dataSource: jsonUrl
    };
</script>

<div id='chart-container' style='height: inherit;' >
  <SvelteFC {...chartConfig} />
</div>