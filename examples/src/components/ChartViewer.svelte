<script>
  import AddingReferenceLine from './samples/AddingReferenceLine.svelte';
  import AnnotatingData from './samples/AnnotatingData.svelte';
  import ApplyTheme from './samples/ApplyTheme.svelte';
  import AreaTimeAxis from './samples/AreaTimeAxis.svelte';
  import ChangeChartType from './samples/ChangeChartType.svelte';
  import ColumnChartTimeAxis from './samples/ColumnChartTimeAxis.svelte';
  import ColumnLineAreaCombi from './samples/ColumnLineAreaCombi.svelte';
  import ColumnLineTimeAxis from './samples/ColumnLineTimeAxis.svelte';
  import DateEventOverlay from './samples/DateEventOverlay.svelte';
  import DrillDown from './samples/DrillDown.svelte';
  import DynamicallyAddChart from './samples/DynamicallyAddChart.svelte';
  import ExportCharts from './samples/ExportCharts.svelte';
  import FetchDataFromJSONUrl from './samples/FetchDataFromJSONUrl.svelte';
  import FetchDataFromXMLUrl from './samples/FetchDataFromXMLUrl.svelte';
  import InteractiveCandlestickChart from './samples/InteractiveCandlestickChart.svelte';
  import MultiSeriesTimeAxis from './samples/MultiSeriesTimeAxis.svelte';
  import MultivariateTimeseries from './samples/MultivariateTimeseries.svelte';
  import PercentageCalculation from './samples/PercentageCalculation.svelte';
  import Pie3DChart from './samples/Pie3DChart.svelte';
  import RenderAlert from './samples/RenderAlert.svelte';
  import ResponsiveCharts from './samples/ResponsiveCharts.svelte';
  import SimpleChart from './samples/SimpleChart.svelte';
  import SimpleGauge from './samples/SimpleGauge.svelte';
  import SimpleTimeseries from './samples/SimpleTimeseries.svelte';
  import SingleEventOverlay from './samples/SingleEventOverlay.svelte';
  import SliceDataPlots from './samples/SliceDataPlots.svelte';
  import SpecialEvents from './samples/SpecialEvents.svelte';
  import TriggerEventsFromChart from './samples/TriggerEventsFromChart.svelte';
  import UpdateChartAttribute from './samples/UpdateChartAttribute.svelte';
  import UpdateChartAttributeThroughMethod from './samples/UpdateChartAttributeThroughMethod.svelte';
  import UpdateChartData from './samples/UpdateChartData.svelte';
  import UseAnnotations from './samples/UseAnnotations.svelte';
  import WorldMap from './samples/WorldMap.svelte';

  import { sampleNames } from './utils/constants.js';

  import { beforeUpdate } from 'svelte';

  export let sampleId = 'simple-chart';

  let className = 'chart-container-500';

  beforeUpdate(() => {
    if (sampleId === sampleNames.EXPORTCHARTS) {
      className = 'chart-container-1000';
    } else {
      className = 'chart-container-500';
    }
  });
</script>

 <style>
   .chart-container-500 {
     height: 500px;
   }
   .chart-container-1000 {
     height: 1000px;
   }
 </style>

<div class={className}>
  {#if sampleId === sampleNames.SIMPLECHART}
    <SimpleChart />
  {:else if sampleId === sampleNames.SIMPLETIMESERIES}
    <SimpleTimeseries />
  {:else if sampleId === sampleNames.COLUMNTIMEAXIS}
    <ColumnChartTimeAxis />
  {:else if sampleId === sampleNames.AREATIMEAXIS}
    <AreaTimeAxis />
  {:else if sampleId === sampleNames['3DPIECHART']}
    <Pie3DChart />
  {:else if sampleId === sampleNames.SIMPLEGAUGE}
    <SimpleGauge />
  {:else if sampleId === sampleNames.COLUMNLINEAREACOMBICHART}
    <ColumnLineAreaCombi />
  {:else if sampleId === sampleNames.COLUMNCHARTTIMEAXIS}
    <ColumnLineTimeAxis />
  {:else if sampleId === sampleNames.MULTISERIESTIMEAXIS}
    <MultiSeriesTimeAxis />
  {:else if sampleId === sampleNames.MULTIVARIATETIMESERIES}
    <MultivariateTimeseries />
  {:else if sampleId === sampleNames.FETCHDATAFROMJSONURL}
    <FetchDataFromJSONUrl />
  {:else if sampleId === sampleNames.FETCHDATAFROMXMLURL}
    <FetchDataFromXMLUrl />
  {:else if sampleId === sampleNames.UPDATECHARTDATA}
    <UpdateChartData />
  {:else if sampleId === sampleNames.UPDATECHARTATTRIBUTES}
    <UpdateChartAttribute />
  {:else if sampleId === sampleNames.TRIGGEREVENTSFROMCHART}
    <TriggerEventsFromChart />
  {:else if sampleId === sampleNames.PERCENTAGECALCULATION}
    <PercentageCalculation />
  {:else if sampleId === sampleNames.DRILLDOWN}
    <DrillDown />
  {:else if sampleId === sampleNames.ADDINGREFERENCELINE}
    <AddingReferenceLine />
  {:else if sampleId === sampleNames.ANNOTATINGDATA}
    <AnnotatingData />
  {:else if sampleId === sampleNames.SINGLEEVENTOVERLAY}
    <SingleEventOverlay />
  {:else if sampleId === sampleNames.DATEEVENTOVERLAY}
    <DateEventOverlay />
  {:else if sampleId === sampleNames.EXPORTCHARTS}
    <ExportCharts />
  {:else if sampleId === sampleNames.WORLDMAP}
    <WorldMap />
  {:else if sampleId === sampleNames.SPECIALEVENTS}
    <SpecialEvents />
  {:else if sampleId === sampleNames.RENDERALERT}
    <RenderAlert />
  {:else if sampleId === sampleNames.DYNAMICALLYADDCHARTS}
    <DynamicallyAddChart />
  {:else if sampleId === sampleNames.SLICEDATAPLOTS}
    <SliceDataPlots />
  {:else if sampleId === sampleNames.RESPONSIVECHARTS}
    <ResponsiveCharts />
  {:else if sampleId === sampleNames.CHANGECHARTTYPE}
    <ChangeChartType />
  {:else if sampleId === sampleNames.USEANNOTATIONS}
    <UseAnnotations />
  {:else if sampleId === sampleNames.UPDATECHARTATTRIBUTETHROUGHMETHOD}
    <UpdateChartAttributeThroughMethod />
  {:else if sampleId === sampleNames.APPLYTHEME}
    <ApplyTheme />
  {:else if sampleId === sampleNames.INTERACTIVECANDLESTICKCHART}
    <InteractiveCandlestickChart />
  {/if}
</div>