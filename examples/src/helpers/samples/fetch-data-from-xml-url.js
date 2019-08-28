const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let xmlUrl = 'https://static.fusioncharts.com/sample/oilReserves.xml',
    chartConfig = {
      type: 'column2d',
      renderAt: 'chart-container',
      width: '600',
      height: '400',
      dataFormat: 'xmlurl',
      dataSource: xmlUrl
    };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>`,
data =
`<chart caption="Countries With Most Oil Reserves [2017-18]" subcaption="In MMbbl = One Million barrels" xaxisname="Country" yaxisname="Reserves (MMbbl)" numbersuffix="K" theme="fusion">
  <set label="Venezuela" value="290" />
  <set label="Saudi" value="260" />
  <set label="Canada" value="180" />
  <set label="Iran" value="140" />
  <set label="Russia" value="115" />
  <set label="UAE" value="100" />
  <set label="US" value="30" />
  <set label="China" value="30" />
</chart>`;

export default {
  code,
  html,
  data
};
