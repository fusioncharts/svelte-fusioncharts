import SimpleChart from './simple-chart';
import SimpleTimeseries from './simple-timeseries';
import ColumnTimeAxis from './column-time-axis';
import AreaTimeAxis from './area-time-axis';
import ColumnChartTimeAxis from './column-chart-time-axis';
import MultiSeriesTimeAxis from './multi-series-chart-time-axis';
import MultiVariateTimeAxis from './multivariate-time-axis';
import AddingReferenceLine from './adding-reference-line';
import AnnotatingData from './annotating-data';
import SingleEventOverlay from './single-event-overlay';
import DateEventOverlay from './date-event-overlay';
import InteractiveCandleStick from './interactive-candlestick-chart';
import Pie3dChart from './3d-pie-chart';
import ColumnLineAreaCombi from './column-line-area-combi-chart';
import FetchDataFromJSONUrl from './fetch-data-from-json-url';
import FetchDataFromXMLUrl from './fetch-data-from-xml-url';
import UpdateChartData from './update-chart-data';
import UpdateChartAttribute from './update-chart-attribute';
import TriggerEventsFromChart from './trigger-events-from-charts';
import PercentageCalculation from './percentage-calculation';
import ExportCharts from './export-charts';
import DrillDown from './drill-down';
import SimpleGauge from './simple-gauge';
import WorldMap from './world-map';
import SpecialEvents from './special-events';
import RenderAlert from './render-alert';
import DynamicallyAddChart from './dynamically-add-chart';
import SliceDataPlots from './slice-data-plots';
import ResponsiveCharts from './responsive-charts';
import ChangeChartType from './change-chart-type';
import UseAnnotations from './use-annotations';
import UpdateChartAttributeThroughMethod from './update-chart-attribute-through-method';
import ApplyTheme from './apply-theme';

export default {
  'simple-chart': {
    ...SimpleChart
  },
  'simple-timeseries': {
    ...SimpleTimeseries
  },
  'column-time-axis': {
    ...ColumnTimeAxis
  },
  'area-time-axis': {
    ...AreaTimeAxis
  },
  'column-chart-time-axis': {
    ...ColumnChartTimeAxis
  },
  'multi-series-chart-time-axis': {
    ...MultiSeriesTimeAxis
  },
  'multivariate-time-axis': {
    ...MultiVariateTimeAxis
  },
  'adding-reference-line': {
    ...AddingReferenceLine
  },
  'annotating-data': {
    ...AnnotatingData
  },
  'single-event-overlay': {
    ...SingleEventOverlay
  },
  'date-event-overlay': {
    ...DateEventOverlay
  },
  'interactive-candlestick-chart': {
    ...InteractiveCandleStick
  },
  '3d-pie-chart': {
    ...Pie3dChart
  },
  'column-line-area-combi-chart': {
    ...ColumnLineAreaCombi
  },
  'fetch-data-from-json-url': {
    ...FetchDataFromJSONUrl
  },
  'fetch-data-from-xml-url': {
    ...FetchDataFromXMLUrl
  },
  'update-chart-data': {
    ...UpdateChartData
  },
  'update-chart-attributes': {
    ...UpdateChartAttribute
  },
  'trigger-events-from-chart': {
    ...TriggerEventsFromChart
  },
  'percentage-calculation': {
    ...PercentageCalculation
  },
  'export-charts': {
    ...ExportCharts
  },
  'drill-down': {
    ...DrillDown
  },
  'simple-gauge': {
    ...SimpleGauge
  },
  'world-map': {
    ...WorldMap
  },
  'special-events': {
    ...SpecialEvents
  },
  'render-alert': {
    ...RenderAlert
  },
  'dynamically-add-chart': {
    ...DynamicallyAddChart
  },
  'slice-data-plots': {
    ...SliceDataPlots
  },
  'responsive-charts': {
    ...ResponsiveCharts
  },
  'change-chart-type': {
    ...ChangeChartType
  },
  'use-annotations': {
    ...UseAnnotations
  },
  'update-chart-attribute-through-method': {
    ...UpdateChartAttributeThroughMethod
  },
  'apply-theme': {
    ...ApplyTheme
  }
};
