<script>
	import FusionCharts from 'fusioncharts/core';
	import area2d from 'fusioncharts/viz/area2d';
	import SvelteFC from './SvelteFC.svelte';

	export let name;

	let chartConfig = {
		type: 'area2d',
		renderAt: '__svelte_fc_chart_container',
		width: '600',
		height: '350',
		dataFormat: 'json',
		dataSource: {
			chart: {
				caption: 'Caption'
			},
			data: [{
				label: 'Jan',
				value: '1000'
			}, {
				label: 'Feb',
				value: '2000'
			}]
		}
	};
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
<SvelteFC />
