<script>
	import FusionCharts from 'fusioncharts/core';
	import SvelteFC from './SvelteFC.svelte';
	import Charts from 'fusioncharts/charts';
	import { beforeUpdate } from 'svelte';

	export let name;

	let status = 0,
		chartConfig = {
			type: 'column2d',
			renderAt: 'di',
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

	const onClickHandler = function () {
		status = (status + 1) % 2;
		// chartConfig.type = 'line';
		// if (status === 1) {
		// 	chartConfig.type = 'line';
		// } else {
		// 	chartConfig.type = 'area2d';
		// }
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
<button on:click={onClickHandler}>Click Me!!</button>

<SvelteFC {Charts} {...chartConfig} />