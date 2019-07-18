<script>
    import FusionCharts from 'fusioncharts/core';
    import FCCharts from 'fusioncharts/charts';
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
    import {
        isResizeRequired,
        isChartTypeChanged,
        isDataSourceUpdated,
        cloneObject
    } from './utils.js';

    // props
    export let chartConstructor = FusionCharts,
        Charts = FCCharts,
        id,
        className = '',
        type = 'column2d',
        renderAt = '__svelte_fc_chart_container',
        width = '600',
        height = '350',
        dataFormat = 'json',
        dataSource = {};

    let chart,
        key,
        oldChartConfig = {},
        chartConfig = {};

    chartConstructor.addDep(Charts);

    /**
     * Life cycle method sequence
     * beforeUpdate -> onMount -> afterUpdate (during intial render)
     * beforeUpdate -> afterUpdate (during re-render)
     */
    beforeUpdate(() => {
        chartConfig = {
            id,
            type,
            renderAt,
            width,
            height,
            dataFormat,
            dataSource: cloneObject(dataSource)
        };
    });
    onMount(() => {
        chart = new chartConstructor(chartConfig);
        chart.render();
        oldChartConfig = cloneObject(chartConfig);
    });
    afterUpdate(() => {
        if (isResizeRequired(oldChartConfig, chartConfig)) {
            chart.resizeTo(chartConfig.width, chartConfig.height);
        }

        if (isChartTypeChanged(oldChartConfig, chartConfig)) {
            chart.chartType(chartConfig.type);
        }

        if (isDataSourceUpdated(oldChartConfig, chartConfig)) {
            chart.setJSONData(chartConfig.dataSource);
        }

        oldChartConfig = cloneObject(chartConfig);
    });
    onDestroy(() => {
        chart.dispose();
    })
</script>

<div {className} id={renderAt}></div>
<!-- <div>{width}</div> -->