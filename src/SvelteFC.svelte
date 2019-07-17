<script>
    import FusionCharts from 'fusioncharts/core';
    import FCCharts from 'fusioncharts/charts';
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';

    // props
    export let chartConstructor = FusionCharts,
        Charts = FCCharts,
        id = 'chart1',
        className = '',
        type = 'column2d',
        renderAt = '__svelte_fc_chart_container',
        width = '600',
        height = '350',
        dataFormat = 'json',
        dataSource = {};

    let chart,
        chartConfig = {
            id,
            type,
            renderAt,
            width,
            height,
            dataFormat,
            dataSource
        };

    chartConstructor.addDep(Charts);

    onMount(() => {
        chart = new chartConstructor(chartConfig);
        chart.render();
        // console.log('onMount');
    });
    beforeUpdate(() => {
        // console.log(type, chartConfig.type);
        // console.log('beforeUpdate');
    });
    afterUpdate(() => {
        // console.log('afterUpdate');
    });
    onDestroy(() => {
        // console.log('destroyed');
        chart.dispose();
    })
</script>

<div {className} id={renderAt}></div>