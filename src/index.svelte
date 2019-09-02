<script context="module">
    let FusionCharts;

    export function fcRoot (core, ...modules) {
        FusionCharts = core;
        modules.forEach(m => {
            if ((m.getName && m.getType) || (m.name && m.type)) {
                core.addDep(m);
            } else {
                m(core);
            }
        });
    }
</script>

<script>
    import { onMount, onDestroy, beforeUpdate, afterUpdate, createEventDispatcher } from 'svelte';
    import Events from './events.js';
    import {
        isResizeRequired,
        isChartTypeChanged,
        isDataSourceUpdated,
        cloneObject
    } from './utils.js';

    // props
    export let id,
        className = '',
        type = 'column2d',
        renderAt = '__svelte_fc_chart_container',
        width = '600',
        height = '350',
        dataFormat = 'json',
        dataSource = {},
        chart;

    let key,
        oldChartConfig,
        chartConfig;

    const dispatch = createEventDispatcher();
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
        if (!FusionCharts) {
            console.warn('Invalid FusionCharts constructor');
        } else {
            FusionCharts.ready(function () {
                chart = new FusionCharts(chartConfig);
                chart.render();
            });

            Events.forEach(event => {
                FusionCharts.addEventListener(event, e => {
                    dispatch(event, e);
                });
            });
        }
    });
    afterUpdate(() => {
        // If not the first render
        if (oldChartConfig) {
            if (isResizeRequired(oldChartConfig, chartConfig)) {
                chart.resizeTo(chartConfig.width, chartConfig.height);
            }

            if (isChartTypeChanged(oldChartConfig, chartConfig)) {
                chart.chartType(chartConfig.type, chartConfig);
            } else if (isDataSourceUpdated(oldChartConfig, chartConfig)) {
                chart.setJSONData(chartConfig.dataSource);
            }
        }
        oldChartConfig = cloneObject(chartConfig);
    });
    onDestroy(() => {
        chart.dispose();
    })
</script>

<div class={className} id={renderAt}></div>
