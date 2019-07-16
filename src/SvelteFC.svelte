<script>
    import FusionCharts from 'fusioncharts/core';
    import column2d from 'fusioncharts/viz/column2d';

    export let chartConstructor = FusionCharts,
        chartType = column2d,
        chartConfig = {
            type: chartType.getName() + '',
            renderAt: '__svelte_fc_chart_container',
            width: '600',
            height: '350',
            dataFormat: 'json',
            dataSource: {}
        };

    chartConstructor.options.creditLabel = 0;
    chartConstructor.addDep(chartType);

    chartConstructor.ready(function () {
        let chart = new chartConstructor(chartConfig);
        chart.render();
    });
</script>

<div id="__svelte_fc_chart_container">FC!!</div>