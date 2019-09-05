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
        cloneObject,
        createUniqueId
    } from './utils.js';

    // props
    export let id,
        className = '',
        inlineStyle = '',
        type,
        renderAt,
        width,
        height,
        dataFormat = 'json',
        dataSource,
        chart;

    let key,
        oldChartConfig,
        chartConfig,
        eventListerners = [];

    const dispatch = createEventDispatcher(),
        uniqueDivId = createUniqueId();
    /**
     * Life cycle method sequence
     * beforeUpdate -> onMount -> afterUpdate (during intial render)
     * beforeUpdate -> afterUpdate (during re-render)
     */
    beforeUpdate(() => {
        renderAt = uniqueDivId;
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

            Events.forEach((event, index) => {
                eventListerners.push(e => {
                    dispatch(event, e);
                });
                FusionCharts.addEventListener(event, eventListerners[index]);
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
        Events.forEach((event, index) => {
            FusionCharts.removeEventListener(event, eventListerners[index]);
        });
    })
</script>

<div class={className} style={inlineStyle} id={uniqueDivId}></div>
