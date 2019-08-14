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
    import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
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
        events = {};

    let chart,
        key,
        oldChartConfig,
        chartConfig;

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
            dataSource: cloneObject(dataSource),
            events
        };
    });
    onMount(() => {
        if (!FusionCharts) {
            console.warn('Invalid FusionCharts constructor');
        } else {
            chart = new FusionCharts(chartConfig);
            chart.render();
        }
    });
    afterUpdate(() => {
        // If not the first render
        if (oldChartConfig) {
            if (isResizeRequired(oldChartConfig, chartConfig)) {
                chart.resizeTo(chartConfig.width, chartConfig.height);
            }

            if (isChartTypeChanged(oldChartConfig, chartConfig)) {
                chart.chartType(chartConfig.type);
            }

            if (isDataSourceUpdated(oldChartConfig, chartConfig)) {
                chart.setJSONData(chartConfig.dataSource);
            }


            if (chartConfig.events || oldChartConfig.events) {
                let oldEvts = oldChartConfig.events,
                newEvts = chartConfig.events;

                // For all old events which got removed, remove them
                for (let evt in oldEvts) {
                    if (!newEvts || !newEvts[evt] || newEvts[evt] !== oldEvts[evt]) {
                        chart.removeEventListener(evt, oldEvts[evt]);
                    }
                }
                // add new evet listeners
                for (let evt in newEvts) {
                    if (!oldEvts || !oldEvts[evt] || newEvts[evt] !== oldEvts[evt]) {
                        chart.addEventListener(evt, newEvts[evt]);
                    }
                }
                
                
            }
        }
        oldChartConfig = cloneObject(chartConfig);
    });
    onDestroy(() => {
        chart.dispose();
    })
</script>

<div class={className} id={renderAt}></div>
