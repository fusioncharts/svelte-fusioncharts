<script>
  import CodeMirror from 'codemirror';
  import sampleConfig from '../helpers/samples';
  import SvelteFC, { fcRoot } from '../../../index.mjs';
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';
  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import { onMount } from 'svelte';

  import ListItem from './ListItem.svelte';
  import listItemInfo from './utils/list-item-info.js';

  // chart configurations
  fcRoot(FusionCharts, Charts, FusionTheme);
  
  let chartConfig = {
    type: 'column2d',
    renderAt: 'chart-div',
    width: '100%',
    height: '100%',
    dataSource: {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion"
      },
      "data": [
        {
          "label": "Venezuela",
          "value": "290"
        },
        {
          "label": "Saudi",
          "value": "260"
        },
        {
          "label": "Canada",
          "value": "180"
        },
        {
          "label": "Iran",
          "value": "140"
        },
        {
          "label": "Russia",
          "value": "115"
        },
        {
          "label": "UAE",
          "value": "100"
        },
        {
          "label": "US",
          "value": "30"
        },
        {
          "label": "China",
          "value": "30"
        }
      ]
    }
  };

  let chartCode,
    jsonCode;

  onMount(() => {
    jsonCode = CodeMirror(chartCode, {
      tabSize: '2',
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
          {#each listItemInfo as info}
            <ListItem
              view={'mobile'}
              type={info.type}
              dataId={info.dataId}
              cssClass={info.cssClass}
              selected={info.selected}
              title={info.title}
              description={info.description}
              badge={info.badge}
            />
          {/each}
        </div>
      </div>
    </div>
    <!-- Chart selection for mobile devices - end -->

    <div class="row">
      <div class="side-nav col-3 d-none d-md-block">
        <div class="nav-heading">Quick Demo:</div>
        <div class="nav-list">
          {#each listItemInfo as info}
            <ListItem
              type={info.type}
              dataId={info.dataId}
              cssClass={info.cssClass}
              selected={info.selected}
              title={info.title}
              description={info.description}
              badge={info.badge}
            />
          {/each}
        </div>
      </div>
      <div class="col-md-9 col-12">
        <div class="card shadow">
          <div class="card-body chart-wrapper">
            <div class="chart-wrapper-inner">
              <!-- render chart here -->
              <div id="chart-container-wrapper">
                <div title="chart-viewer" id="chart-container">
                  <SvelteFC {...chartConfig} />
                </div>
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