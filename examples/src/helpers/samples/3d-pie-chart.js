const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts;
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, {fcRoot} from 'svelte-fusioncharts';

  fcRoot(FusionCharts, Charts, FusionTheme);

  const dataSource = { /* see data tab */ };

  const chartConfigs = {
		type: 'pie3d',
		width: 600,
		height: 400,
		dataFormat: 'json',
		dataSource: dataSource
	};
</script>`,

html =
`<div id='container'>
  <SvelteFC
    {...chartConfigs}
  />
</div>`,

data =
`{
  "chart": {
    "caption": "Recommended Portfolio Split",
    "subCaption" : "For a net-worth of $1M",
    "showValues":"1",
    "showPercentInTooltip" : "0",
    "numberPrefix" : "$",
    "enableMultiSlicing":"1",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Equity",
      "value": "300000"
    }, {
      "label": "Debt",
      "value": "230000"
    }, {
      "label": "Bullion",
      "value": "180000"
    }, {
      "label": "Real-estate",
      "value": "270000"
    }, {
      "label": "Insurance",
      "value": "20000"
    }
  ]
}`;

export default {
  code,
  html,
  data
};
