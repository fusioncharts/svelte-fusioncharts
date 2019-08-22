<!-- info section start -->
<div class="container container-1200 info-wrapper pt-4">
  <div class="row">
    <div class="col">
      <div class="h2 mt-2">Quick Start</div>
    </div>
  </div>
  <div class="h4 mt-2">Setting up the FusionCharts Svelte Component</div>
  <!-- steps -->
  <div class="row">
    <div class="col-12 pt-1">
      <div class="h6">
        <span>Step 1: Include <a href="https://jquery.com/download/" target="_blank">jquery.min.js</a> to enable jQuery
          in your project:</span>
      </div>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c1"></div>
            </div>
          </div>
        </div>
      </div>
      <p class="code-desc mt-2 mb-1">
        jQuery needs to be imported before the FusionCharts jQuery plugin is included in the project. Note that in
        order to support IE 6/7/8, jQuery 1.x versions need to be used.
      </p>
    </div>
  </div>
  <!-- steps -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h6">
        <span>Step 2: Include the FusionCharts package</span>
      </div>
      <ul>
        <li>Copy fusioncharts.js from the FusionCharts Download Package > js folder in your project</li>
        <li>Add reference to the file in your code</li>
      </ul>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- steps -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h6">
        <span>Step 3: Include the jquery-fusioncharts module</span>
      </div>
      <ul>
        <li>Copy fusioncharts.jqueryplugin.js from the FusionCharts Download Package > js folder in your project</li>
        <li>Add reference to the file in your code</li>
      </ul>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- steps -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h6">
        <span>Step 4 (optional): Include the theme file.</span>
      </div>
      <p class="code-desc mb-1">This step is optional, the chart will render with the default theme even if the theme
        file is not included.</p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="code-desc mt-2 mb-1">This completes the setup and you are now ready to begin using the FusionCharts
    jQuery plugin.</p>

  <p class="code-desc mb-1">In addition to using all the existing features, the jQuery plugin lets you do the
    following:</p>

  <ul>
    <li>Render jQuery charts that work across PCs (including IE6/7/8), Macs, iPads, iPhones, and Android devices
      seamlessly</li>
    <li>Update chart type, data, and individual cosmetic properties at run-time</li>
    <li>Insert, prepend, and append multiple charts in an existing chart container</li>
    <li>Customize the look and feel of all elements on the chart</li>
    <li>Plot charts from data contained in HTML tables</li>
  </ul>

  <div class="h4 mt-5">Rendering charts using jQuery</div>

  <p class="code-desc mb-1">For rendering new charts, you can use the following jQuery methods:</p>

  <ul>
    <li>insertFusionCharts</li>
    <li>appendFusionCharts</li>
    <li>prependFusionCharts</li>
  </ul>

  <div class="row mt-2">
    <div class="col-12 pt-1">
      <div class="h6">
        <span>insertFusionCharts Method:</span>
      </div>
      <p class="code-desc mt-1 mb-1">
        Renders charts inside HTML elements. The HTML elements have to be selected using jQuery selector. In case,
        multiple HTML elements are selected using the jQuery selector, a chart will be rendered inside each selected
        HTML element. All existing elements inside the selected elements will be replaced by the rendered charts. This
        method returns the jQuery selected element to allow chaining with other jQuery methods.
      </p>
      <p class="code-desc mt-2 mb-1">
        An object of chart configurations (set of key, value pairs) can be passed as parameter. Click <a
          class="ref-link" href="https://www.fusioncharts.com/dev/chart-guide/chart-configurations/size-and-type"
          target="_blank">here</a> to view
        complete list of chart configurations.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row mt-2">
    <div class="col-12 pt-1">
      <div class="h6">
        <span>appendFusionCharts Method:</span>
      </div>
      <p class="code-desc mt-1 mb-1">
        Renders charts at the end of selected HTML elements. The HTML elements need to be selected using jQuery
        selector. In case multiple HTML elements are selected, chart will be rendered inside each selected HTML
        element. All existing elements inside the selected elements will be preserved. The method returns the original
        jQuery selection to allow chaining of other jQuery methods.
      </p>
      <p class="code-desc mt-2 mb-1">
        An object of chart configurations (set of key, value pairs) can be passed as parameter. Click <a
          class="ref-link" href="https://www.fusioncharts.com/dev/chart-guide/chart-configurations/size-and-type"
          target="_blank">here</a> to view
        complete list of chart configurations.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c6"></div>
            </div>
          </div>
        </div>
      </div>

      <p class="code-desc mb-1">In the above example, the horizontal linear gauge has been rendered using the
        insertFusionCharts method. The constructor object is passed as an argument to the insertFusionCharts method</p>
      <p class="code-desc mb-1">In the above code snippet, the cloneFusionCharts method is used to create a
        column-chart clone of the existing pie-chart.This method finds all the charts in the selected element and
        returns of list of their clones.</p>
      <p class="code-desc mb-1">The cloneFusionCharts method accepts two arguments:</p>
      <ul>
        <li>An anonymous callback function: An array of cloned charts (in this Array) is passed to this function for
          further processing</li>
        <li>A configuration object: An object containing chart configurations which are applied to each cloned chart
        </li>
      </ul>
    </div>
  </div>

  <div class="row mt-2">
    <div class="col-12 pt-1">
      <div class="h6">
        <span>prependFuionCharts Method:</span>
      </div>
      <p class="code-desc mt-1 mb-1">
        Renders and inserts charts at the beginning of selected HTML elements. The HTML elements need to be selected
        using jQuery selector. In case multiple HTML elements are selected, chart will be rendered inside each selected
        HTML element. All existing elements inside the selected elements will be preserved. The method returns the
        original jQuery selection to allow chaining of other jQuery methods.
      </p>
      <p class="code-desc mt-2 mb-1">
        An object of chart configurations (set of key, value pairs) can be passed as parameter. Click <a
          class="ref-link" href="https://www.fusioncharts.com/dev/chart-guide/chart-configurations/size-and-type"
          target="_blank">here</a> to view
        complete list of chart configurations.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <p class="code-desc mb-1">Similar to the appendFusionCharts method example, the cloneFusionCharts method is used
    here to clone the existing pie chart, which is then prepended as a column chart.</p>
  <p class="code-desc mb-1">There! You have now seen the various methods you can use to render charts using the
    jQuery plugin.</p>
  <p class="code-desc mb-1">More detailed information and documentation can be found <a class="ref-link"
      href="https://www.fusioncharts.com/dev/" target="_blank">here</a>.</p>

  <!-- steps end -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h5">Support</div>
      <p>
        <a class="ref-link" href="//github.com/fusioncharts/fusioncharts-jquery-plugin/issues" target="_blank">GitHub
          Issues</a> |
        <a class="ref-link" href="mailto:support@fusioncharts.com" target="_blank">Contact FusionCharts Support</a>
      </p>
    </div>
  </div>

  <!-- FusionTime Integration -->
  <div class="row">
    <div class="col">
      <div class="h2 mt-2">Usage and integration of FusionTime</div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p class="code-desc">From <code>fusioncharts@3.13.3-sr.1</code> You can visualize timeseries data easily with
        jquery.
      </p>
      <div class="h6 mt-2">
        Consider the example below for integration of FusionTime
      </div>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- licensing footer starts -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h5">Licensing</div>
      <p>jQuery-FusionCharts module is licensed under open-source, distributed under the terms of the MIT/X11
        License. You will still need to include FusionCharts in your page, as this project provides
        no direct functionality. You can download a free evaluation version
        <a class="ref-link" href="//www.fusioncharts.com/download/" target="_blank">here</a>. To use in a commercial
        environment, please
        <a class="ref-link" href="//www.fusioncharts.com/buy/" target="_blank">purchase a FusionCharts license</a>.</p>
    </div>
  </div>
  <!-- licensing footer ends -->
  <!-- info section end -->
</div>