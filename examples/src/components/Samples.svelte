<script>
  import CodeMirror from 'codemirror';
  import sampleConfig from '../helpers/samples.js';
  import { onMount } from 'svelte';

  let chartCode,
    jsonCode;

  onMount(() => {
    jsonCode = CodeMirror(chartCode, {
      tabSize: '4',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'javascript'
    });

    jsonCode.setValue(sampleConfig['simple-chart']['code']);
  });
</script>

<!-- Demo Section start -->
<div class="demo bg-light-purple pt-4 pb-4">
  <div class="container container-1200 info-wrapper">
    <!-- Chart selection for mobile devices - start -->
    <div class="row">
      <div class="col-12 d-flex justify-content-center d-md-none">
        <div id="mobileChart-selector" class="base-dropdown chart-selector">
          <div class="selector">A Simple Chart</div>
          <div class="placeholder">Quick Demo:</div>
          <div class="caret">
            <i class="fc_dropdown"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal for selection (Only for Mobile Devices) -->
    <div id="myModal" class="modal hidden">

      <!-- Modal content -->
      <div class="modal-content">
        <div class="nav-list">
          <div data-id="simple-chart" class="nav-item selected">
            <div class="p">A Simple Chart</div>
          </div>
          <div data-id="simple-timeseries" class="nav-item">
            <div class="p">A Simple TimeSeries</div>
          </div>
          <div data-id="column-time-axis" class="nav-item">
            <div class="p">Column chart with time axis</div>
          </div>
          <div data-id="area-time-axis" class="nav-item">
            <div class="p">Area chart with time axis</div>
          </div>
          <div data-id="3d-pie-chart" class="nav-item">
            <div class="p">A 3D Pie Chart</div>
          </div>
          <div data-id="simple-gauge" class="nav-item">
            <div class="p">A simple gauge</div>
          </div>
          <div data-id="column-line-area-combi-chart" class="nav-item">
            <div class="p">A Column, Line and Area Combi Chart</div>
          </div>
          <div data-id="column-chart-time-axis" class="nav-item">
            <div class="p">Column and line combination on time axis</div>
          </div>
          <div data-id="multi-series-time-axis" class="nav-item">
            <div class="p">Plotting multiple series on time axis</div>
          </div>
          <div data-id="multivariate-timeseries" class="nav-item">
            <div class="p">Plotting two variables (measures)</div>
          </div>
          <div data-id="fetch-data-from-json-url" class="nav-item">
            <div class="p">Fetch data from JSON URL</div>
          </div>
          <div data-id="fetch-data-from-xml-url" class="nav-item">
            <div class="p">Fetch data from XML URL</div>
          </div>
          <div data-id="update-chart-data" class="nav-item">
            <div class="p">Update chart data from component</div>
          </div>
          <div data-id="update-chart-attributes" class="nav-item">
            <div class="p">Update chart attribute from component</div>
          </div>
          <div data-id="trigger-events-from-chart" class="nav-item">
            <div class="p">Trigger events from chart</div>
          </div>
          <div data-id="percentage-calculation" class="nav-item">
            <div class="p">Percentage Calculation</div>
          </div>
          <div data-id="drill-down" class="nav-item">
            <div class="p">Add drill-down to chart</div>
          </div>
          <div data-id="adding-reference-line" class="nav-item">
            <div class="p">Adding a reference line</div>
          </div>
          <div data-id="annotating-data" class="nav-item">
            <div class="p">Annotating single data point</div>
          </div>
          <div data-id="single-event-overlay" class="nav-item">
            <div class="p">Single event overlay</div>
          </div>
          <div data-id="date-event-overlay" class="nav-item">
            <div class="p">Date range event overlay</div>
          </div>
          <div data-id="export-charts" class="nav-item">
            <div class="p">Export multiple charts</div>
          </div>
          <div data-id="world-map" class="nav-item">
            <div class="p">World Map</div>
          </div>
          <div data-id="apply-theme" class="nav-item">
            <div class="p">Applying a different theme</div>
          </div>
          <div data-id="special-event" class="nav-item">
            <div class="p">Special Events</div>
          </div>
          <div data-id="render-alert" class="nav-item">
            <div class="p">Lifecycle events</div>
          </div>
          <div data-id="dynamically-add-chart" class="nav-item">
            <div class="p">Dynamically add chart event listener</div>
          </div>
          <div data-id="slice-data-plots" class="nav-item">
            <div class="p">Slice data plots</div>
          </div>
          <div data-id="responsive-charts" class="nav-item">
            <div class="p">Responsive charts</div>
          </div>
          <div data-id="change-chart-type" class="nav-item">
            <div class="p">Change chart type at run time</div>
          </div>
          <div data-id="use-annotations" class="nav-item">
            <div class="p">Use annotations</div>
          </div>
          <div data-id="update-chart-attribute-through-method" class="nav-item">
            <div class="p">Update chart attribute through methods</div>
          </div>
          <div data-id="apply-theme" class="nav-item">
            <div class="p">Applying a different theme</div>
          </div>
          <div data-id="interactive-candlestick-chart" class="nav-item">
            <div class="p">Interactive candlestick chart</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chart selection for mobile devices - end -->

    <div class="row">
      <div class="side-nav col-3 d-none d-md-block">
        <div class="nav-heading">Quick Demo:</div>
        <div class="nav-list">
          <div data-id="simple-chart" class="nav-item selected">
            <div class="h5">A Simple Chart</div>
            <div class="p item-desc">A simple chart with all data embedded into the directive</div>
          </div>
          <div data-id="simple-timeseries" class="nav-item">
            <div class="nav-group">
              <div class="h5">A Simple TimeSeries</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">A simple time-series chart with a single series plotted as line</div>
          </div>
          <div data-id="column-time-axis" class="nav-item">
            <div class="nav-group">
              <div class="h5">Column chart with time axis</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Time-series chart with series plotted as column</div>
          </div>
          <div data-id="area-time-axis" class="nav-item">
            <div class="nav-group">
              <div class="h5">Area chart with time axis</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Time-series chart with series plotted as are</div>
          </div>
          <div data-id="3d-pie-chart" class="nav-item">
            <div class="h5">A 3D Pie Chart</div>
            <div class="p item-desc">A 3D pie chart using the datasource attribute from component's scope</div>
          </div>
          <div data-id="simple-gauge" class="nav-item">
            <div class="h5">A simple gauge</div>
            <div class="p item-desc">A simple gauge to show customer satisfaction score</div>
          </div>
          <div data-id="column-line-area-combi-chart" class="nav-item">
            <div class="h5">A Column, Line and Area Combi Chart</div>
            <div class="p item-desc">A combination chart of column , line and area</div>
          </div>
          <div data-id="column-chart-time-axis" class="nav-item">
            <div class="nav-group">
              <div class="h5">Column and line combination on time axis</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Two series of data plotted as a combination of column & line on the same y-axis
            </div>
          </div>
          <div data-id="multi-series-time-axis" class="nav-item">
            <div class="nav-group">
              <div class="h5">Plotting multiple series on time axis</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">A multi-series chart with 2 variables plotted as line on the same y-axis</div>
          </div>
          <div data-id="multivariate-timeseries" class="nav-item">
            <div class="nav-group">
              <div class="h5">Plotting two variables (measures)</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Plotting 2 different variables in 2 different vertically stacked canvases</div>
          </div>
          <div data-id="fetch-data-from-json-url" class="nav-item">
            <div class="h5">Fetch data from JSON URL</div>
            <div class="p item-desc">Fetch data remotely from a JSON file or URL</div>
          </div>
          <div data-id="fetch-data-from-xml-url" class="nav-item">
            <div class="h5">Fetch data from XML URL</div>
            <div class="p item-desc">Fetch data remotely from a XML file or URL</div>
          </div>
          <div data-id="update-chart-data" class="nav-item">
            <div class="h5">Update chart data</div>
            <div class="p item-desc">Change the data dynamically and watch the chart update automatically</div>
          </div>
          <div data-id="update-chart-attributes" class="nav-item">
            <div class="h5">Update chart attribute</div>
            <div class="p item-desc">Update the chart with new attributes</div>
          </div>
          <div data-id="trigger-events-from-chart" class="nav-item">
            <div class="h5">Listen to events from chart</div>
            <div class="p item-desc">Bind event listener to the chart and get the related event data</div>
          </div>
          <div data-id="percentage-calculation" class="nav-item">
            <div class="h5">Percentage Calculation</div>
            <div class="p item-desc">Hover on a plot to see the percentage value with respect to total</div>
          </div>
          <div data-id="drill-down" class="nav-item">
            <div class="h5">Add drill-down to chart</div>
            <div class="p item-desc">Use LinkedCharts to quickly add drill-down to charts</div>
          </div>
          <div data-id="adding-reference-line" class="nav-item">
            <div class="nav-group">
              <div class="h5">Adding a reference line</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Adding a static reference line (by value) to indicate targets or threshold</div>
          </div>
          <div data-id="annotating-data" class="nav-item">
            <div class="nav-group">
              <div class="h5">Annotating single data point</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Annotating specific data point using data markers on line series</div>
          </div>
          <div data-id="single-event-overlay" class="nav-item">
            <div class="nav-group">
              <div class="h5">Single event overlay</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Plotting an event marker to indicate an event for a specific date</div>
          </div>
          <div data-id="date-event-overlay" class="nav-item">
            <div class="nav-group">
              <div class="h5">Date range event overlay</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Plotting an event marker as a band, to indicate an event that spans a data range
            </div>
          </div>
          <div data-id="export-charts" class="nav-item">
            <div class="h5">Export multiple charts</div>
            <div class="p item-desc">Use Batch Export Feature to export multiple charts as a single image/PDF</div>
          </div>
          <div data-id="world-map" class="nav-item">
            <div class="h5">World Map</div>
            <div class="p item-desc">World map showing data for different continents</div>
          </div>
          <div data-id="special-events" class="nav-item">
            <div class="h5">Special Events</div>
            <div class="p item-desc">Drag a projected column to see its change</div>
          </div>
          <div data-id="render-alert" class="nav-item">
            <div class="h5">Lifecycle events</div>
            <div class="p item-desc">This sample lists the basic lifecycle events at the time of rendering FusionCharts.
            </div>
          </div>
          <div data-id="dynamically-add-chart" class="nav-item">
            <div class="h5">Dynamically add chart event listener</div>
            <div class="p item-desc">How you can dynamically(runtime) add & remove chart specific events in FusionCharts
            </div>
          </div>
          <div data-id="slice-data-plots" class="nav-item">
            <div class="h5">Slice data plots</div>
            <div class="p item-desc">Use Chart specific custom API</div>
          </div>
          <div data-id="responsive-charts" class="nav-item">
            <div class="h5">Responsive charts</div>
            <div class="p item-desc">Select any of the dimensions given in the list. The chart adjusts itself to its
              alloted percentage</div>
          </div>
          <div data-id="change-chart-type" class="nav-item">
            <div class="h5">Change chart type at run time</div>
            <div class="p item-desc">Change the chart type dynamically or at runtime</div>
          </div>
          <div data-id="use-annotations" class="nav-item">
            <div class="h5">Use annotations</div>
            <div class="p item-desc">Add custom shapes to highlight a specific data point</div>
          </div>
          <div data-id="update-chart-attribute-through-method" class="nav-item">
            <div class="h5">Usage of FusionCharts methods (API) </div>
            <div class="p item-desc">Change a chart attribute by calling FusionCharts setChartAttribute API</div>
          </div>
          <div data-id="apply-theme" class="nav-item">
            <div class="h5">Applying a different theme</div>
            <div class="p item-desc">Choosing from different themes available in FusionCharts Suite</div>
          </div>
          <div data-id="interactive-candlestick-chart" class="nav-item">
            <div class="nav-group">
              <div class="h5">Interactive candlestick chart</div>
              <div class="h5 badge badge-normal">FusionTime</div>
            </div>
            <div class="p item-desc">Time-series chart plotted as candlestick, with 4 different values for each plot
              (open, high, low, close)</div>
          </div>
        </div>
      </div>
      <div class="col-md-9 col-12">
        <div class="card shadow">
          <div class="card-body chart-wrapper">
            <div class="chart-wrapper-inner">
              <!-- render chart here -->
              <div id="chart-container-wrapper">
                <iframe title="chart-viewer" id="chart-container"></iframe>
              </div>
            </div>
          </div>
        </div>

        <div class="code-view mt-2">
          <div class="card-shadow" style="background: #03040B;">
            <div class="code-nav-btns btn-group" role="group" aria-label="Basic example">
              <button data-id="code" type="button" class="btn btn-code selected">JavaScript</button>
              <button data-id="html" type="button" class="btn btn-code">HTML</button>
              <button data-id="data" type="button" class="btn btn-code">Data</button>
              <button data-id="schema" type="button" class="btn btn-code schema-btn hide">schema</button>
            </div>
            <div class="card-body p-0">
              <div class="code-panel">
                <div class="code-panel-header">
                  <div bind:this={chartCode} id="chartCode"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Demo Section end -->