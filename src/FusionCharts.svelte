<script>
    import FusionCharts from 'fusioncharts/core';
    import column2d from 'fusioncharts/viz/column2d';

    FusionCharts.addDep(column2d);
    FusionCharts.ready(function () {
        let chart = new FusionCharts({
            id: '1',
            type: 'column2d',
            renderAt: 'chart-container',
            width: '600',
            height: '350',
            dataFormat: 'json',
            dataSource: {
                chart: {
                    caption: 'ABCD',
                },
                data: [{
                    label: 'Jan',
                    value: '1000'
                }, {
                    label: 'Feb',
                    value: '2000'
                }, {
                    label: 'Mar',
                    value: '3000'
                }]
            }
        });

        chart.render();
    });
    console.log(column2d);
</script>

<div id="chart-container">FC!!</div>