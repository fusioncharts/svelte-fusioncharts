let listItemInfo = [
  {
    dataId: 'simple-chart',
    cssClass: 'nav-item',
    selected: true,
    title: 'A Simple Chart',
    description: 'A simple chart with all data embedded into the directive'
  },
  {
    type: 'fusiontime',
    dataId: 'simple-timeseries',
    cssClass: 'nav-item',
    selected: false,
    title: 'A Simple TimeSeries',
    badge: 'FusionTime',
    description: 'A simple time-series chart with a single series plotted as line'
  },
  {
    type: 'fusiontime',
    dataId: 'column-time-axis',
    cssClass: 'nav-item',
    selected: false,
    title: 'Column chart with time axis',
    badge: 'FusionTime',
    description: 'Time-series chart with series plotted as column'
  },
  {
    type: 'fusiontime',
    dataId: 'area-time-axis',
    cssClass: 'nav-item',
    selected: false,
    title: 'Area chart with time axis',
    badge: 'FusionTime',
    description: 'Time-series chart with series plotted as area'
  },
  {
    dataId: '3d-pie-chart',
    cssClass: 'nav-item',
    selected: false,
    title: 'A 3D Pie Chart',
    description: 'A 3D pie chart using the datasource attribute from component\'s scope'
  },
  {
    dataId: 'simple-gauge',
    cssClass: 'nav-item',
    selected: false,
    title: 'A simple gauge',
    description: 'A simple gauge to show customer satisfaction score'
  },
  {
    dataId: 'column-line-area-combi-chart',
    cssClass: 'nav-item',
    selected: false,
    title: 'A Column, Line and Area Combi Chart',
    description: 'A combination chart of column , line and area'
  },
  {
    type: 'fusiontime',
    dataId: 'column-chart-time-axis',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Column and line combination on time axis',
    description: 'Two series of data plotted as a combination of column & line on the same y-axis'
  },
  {
    type: 'fusiontime',
    dataId: 'multi-series-time-axis',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Plotting multiple series on time axis',
    description: 'A multi-series chart with 2 variables plotted as line on the same y-axis'
  },
  {
    type: 'fusiontime',
    dataId: 'multivariate-timeseries',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Plotting two variables (measures)',
    description: 'Plotting 2 different variables in 2 different vertically stacked canvases'
  },
  {
    dataId: 'fetch-data-from-json-url',
    cssClass: 'nav-item',
    selected: false,
    title: 'Fetch data from JSON URL',
    description: 'Fetch data remotely from a JSON file or URL'
  },
  {
    dataId: 'fetch-data-from-xml-url',
    cssClass: 'nav-item',
    selected: false,
    title: 'Fetch data from XML URL',
    description: 'Fetch data remotely from a XML file or URL'
  },
  {
    dataId: 'update-chart-data',
    cssClass: 'nav-item',
    selected: false,
    title: 'Update chart data',
    description: 'Change the data dynamically and watch the chart update automatically'
  },
  {
    dataId: 'update-chart-attributes',
    cssClass: 'nav-item',
    selected: false,
    title: 'Update chart attribute',
    description: 'Update the chart with new attributes'
  },
  {
    dataId: 'trigger-events-from-chart',
    cssClass: 'nav-item',
    selected: false,
    title: 'Listen to events from chart',
    description: 'Bind event listener to the chart and get the related event data'
  },
  {
    dataId: 'percentage-calculation',
    cssClass: 'nav-item',
    selected: false,
    title: 'Percentage Calculation',
    description: 'Hover on a plot to see the percentage value with respect to total'
  },
  {
    dataId: 'drill-down',
    cssClass: 'nav-item',
    selected: false,
    title: 'Add drill-down to chart',
    description: 'Use LinkedCharts to quickly add drill-down to charts'
  },
  {
    type: 'FusionTime',
    dataId: 'adding-reference-line',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Adding a reference line',
    description: 'Adding a static reference line (by value) to indicate targets or threshold'
  },
  {
    type: 'FusionTime',
    dataId: 'annotating-data',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Annotating single data point',
    description: 'Annotating specific data point using data markers on line series'
  },
  {
    type: 'FusionTime',
    dataId: 'single-event-overlay',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Single event overlay',
    description: 'Plotting an event marker to indicate an event for a specific date'
  },
  {
    type: 'FusionTime',
    dataId: 'date-event-overlay',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Date range event overlay',
    description: 'Plotting an event marker as a band, to indicate an event that spans a data range'
  },
  {
    dataId: 'export-charts',
    cssClass: 'nav-item',
    selected: false,
    title: 'Export multiple charts',
    description: 'Use Batch Export Feature to export multiple charts as a single image/PDF'
  },
  {
    dataId: 'world-map',
    cssClass: 'nav-item',
    selected: false,
    title: 'World Map',
    description: 'World map showing data for different continents'
  },
  {
    dataId: 'special-events',
    cssClass: 'nav-item',
    selected: false,
    title: 'Special Events',
    description: 'Drag a projected column to see its change'
  },
  {
    dataId: 'render-alert',
    cssClass: 'nav-item',
    selected: false,
    title: 'Lifecycle events',
    description: 'This sample lists the basic lifecycle events at the time of rendering FusionCharts'
  },
  {
    dataId: 'dynamically-add-chart',
    cssClass: 'nav-item',
    selected: false,
    title: 'Dynamically add chart event listener',
    description: 'How you can dynamically(runtime) add & remove chart specific events in FusionCharts'
  },
  {
    dataId: 'slice-data-plots',
    cssClass: 'nav-item',
    selected: false,
    title: 'Slice data plots',
    description: 'Use Chart specific custom API'
  },
  {
    dataId: 'responsive-charts',
    cssClass: 'nav-item',
    selected: false,
    title: 'Responsive charts',
    description: 'Select any of the dimensions given in the list. The chart adjusts itself to its alloted percentage'
  },
  {
    dataId: 'change-chart-type',
    cssClass: 'nav-item',
    selected: false,
    title: 'Change chart type at run time',
    description: 'Change the chart type dynamically or at runtime'
  },
  {
    dataId: 'use-annotations',
    cssClass: 'nav-item',
    selected: false,
    title: 'Use annotations',
    description: 'Add custom shapes to highlight a specific data point'
  },
  {
    dataId: 'update-chart-attribute-through-method',
    cssClass: 'nav-item',
    selected: false,
    title: 'Usage of FusionCharts methods (API)',
    description: 'Change a chart attribute by calling FusionCharts setChartAttribute API'
  },
  {
    dataId: 'apply-theme',
    cssClass: 'nav-item',
    selected: false,
    title: 'Applying a different theme',
    description: 'Choosing from different themes available in FusionCharts Suite'
  },
  {
    type: 'fusiontime',
    dataId: 'interactive-candlestick-chart',
    cssClass: 'nav-item',
    selected: false,
    badge: 'FusionTime',
    title: 'Interactive candlestick chart',
    description: 'Time-series chart plotted as candlestick, with 4 different values for each plot(open, high, low, close)'
  },
];

export default listItemInfo;
