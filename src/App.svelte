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
			},
			events: {
				beforeRender: function () {
					console.log('beforeRender');
				},
				chartClick: function () {
					console.log('initial chart click');
					
				}

			}
		};

	const onClickHandler = function () {
		status = (status + 1) % 2;
		if (status === 1) {
			chartConfig.dataSource.chart.caption = 'line';
		} else {
			chartConfig.dataSource.chart.caption = 'area2d';
		}
	},
	chartClick = () => {
			console.log('external click');
		},
		changeClickHandler = () => {
			chartConfig.events.chartClick = () => {
					console.log('New click handler');
				};
		};
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>
<button on:click={onClickHandler}>Click Me!!</button>
<button on:click={changeClickHandler}>Click Me to change 'chartCkick' handler</button>

<SvelteFC {Charts} {...chartConfig} on:click={chartClick}/>