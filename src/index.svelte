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
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
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

    // `renderAt` is accepted for backward-compatible API parity but intentionally
    // ignored. The chart always renders into the wrapper's own generated <div>.
    // The reference keeps both the Svelte 4 and Svelte 5 compilers from warning
    // about an unused export.
    void renderAt;

    let rendered = false,
        eventListerners = [];

    /**
     * Internal, non-reactive state held on a plain object on purpose.
     *
     * - `chart` is the live FusionCharts instance. We deliberately do NOT use the
     *   `chart` prop for internal logic: in Svelte 5, when the parent re-renders
     *   (e.g. spreading `{...config}` on a data update), an `export let` prop that
     *   the parent doesn't pass is reset to `undefined`, which would wipe our
     *   reference mid-update. The prop is still assigned (below) so `bind:chart`
     *   keeps working for consumers.
     * - `oldChartConfig` is the diff baseline. The update logic reads and writes it
     *   inside a reactive statement; in Svelte 5 a `$:` block tracks every reactive
     *   value it reads (even inside called functions), so a reactive `let` here
     *   would make the block re-trigger itself in a loop. Keeping both off the
     *   reactive graph makes the same code path behave identically on Svelte 4 and 5.
     */
    const internal = { chart: undefined, oldChartConfig: undefined };

    const dispatch = createEventDispatcher(),
        uniqueDivId = createUniqueId();

    /**
     * The chart always renders into the wrapper's own uniquely-id'd <div>, so the
     * incoming `renderAt` prop is intentionally ignored (kept only for API
     * backward compatibility). Reactive statements ($:) are used instead of
     * beforeUpdate/afterUpdate so the behaviour is identical across Svelte 4 and 5.
     */
    $: chartConfig = {
        id,
        type,
        renderAt: uniqueDivId,
        width,
        height,
        dataFormat,
        dataSource: cloneObject(dataSource)
    };

    // Once the chart is rendered, push prop changes through to the live instance.
    $: if (rendered && chartConfig) {
        applyChartConfig(chartConfig);
    }

    function applyChartConfig (config) {
        const { chart, oldChartConfig } = internal;

        // First call after render only establishes the baseline for diffing.
        if (!chart || !oldChartConfig) {
            internal.oldChartConfig = cloneObject(config);
            return;
        }

        if (isResizeRequired(oldChartConfig, config)) {
            chart.resizeTo(config.width, config.height);
        }

        if (isChartTypeChanged(oldChartConfig, config)) {
            chart.chartType(config.type, config);
        } else if (isDataSourceUpdated(oldChartConfig, config)) {
            chart.setJSONData(config.dataSource);
        }

        internal.oldChartConfig = cloneObject(config);
    }

    onMount(() => {
        if (!FusionCharts) {
            console.warn('Invalid FusionCharts constructor');
            return;
        }

        FusionCharts.ready(function () {
            internal.chart = new FusionCharts(chartConfig);
            // Expose the live instance for `bind:chart` consumers *before* render so
            // handlers for early lifecycle events (e.g. `beforeRender`) can access the
            // chart via the bound prop. Assigning after render() left it undefined
            // during those events.
            chart = internal.chart;
            internal.chart.render();
            internal.oldChartConfig = cloneObject(chartConfig);
            rendered = true;
        });

        Events.forEach((event, index) => {
            eventListerners.push(e => {
                dispatch(event, e);
            });
            FusionCharts.addEventListener(event, eventListerners[index]);
        });
    });

    onDestroy(() => {
        if (internal.chart) {
            internal.chart.dispose();
        }
        Events.forEach((event, index) => {
            FusionCharts.removeEventListener(event, eventListerners[index]);
        });
    });
</script>

<div class={className} style={inlineStyle} id={uniqueDivId}></div>
