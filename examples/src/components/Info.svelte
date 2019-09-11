<script>
  // your script goes here
  import CodeMirror from 'codemirror';
  import js from 'codemirror/mode/javascript/javascript';
  import vue from 'codemirror/mode/vue/vue';
  import 'codemirror/theme/dracula.css';

  import CodeSnippets from './utils/info-code-snippets';

  import { onMount } from 'svelte';

  let c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7;

  onMount(() => {
    CodeMirror(c1, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'javascript'
    }).setValue(CodeSnippets.wrapperInstall);

    CodeMirror(c2, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'javascript'
    }).setValue(CodeSnippets.fcInstall);

    CodeMirror(c3, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'javascript'
    }).setValue(CodeSnippets.addDependency);

    CodeMirror(c4, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'vue'
    }).setValue(CodeSnippets.renderFcCode);

    CodeMirror(c5, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'vue'
    }).setValue(CodeSnippets.renderFcHTML);

    CodeMirror(c6, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'vue'
    }).setValue(CodeSnippets.renderFtCode);

    CodeMirror(c7, {
      tabSize: '2',
      smartIndent: true,
      lineNumbers: true,
      readOnly: true,
      theme: 'dracula',
      mode: 'vue'
    }).setValue(CodeSnippets.renderFtHTML);
  });
</script>

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
        <span>Step 1: Install the Svelte-FusionCharts wrapper </span>
      </div>
      <p class="code-desc mt-2 mb-1">
        In the terminal run the following command:
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c1" bind:this={c1}></div>
            </div>
          </div>
        </div>
      </div>
      <p class="code-desc mt-2 mb-1">
        Also install fusioncharts, if it is not already installed:
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c2" bind:this={c2}></div>
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
        <span>Step 2: Add dependencies to the Svelte-FusionCharts component</span>
      </div>
      <p class="code-desc mt-2 mb-1">
        Use the <code>fcRoot</code> method to inject dependencies to Svelte-FusionCharts component. The first argument should be FusionCharts constructor and the other arguments are the dependencies which needs to be added to FusionCharts.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c3" bind:this={c3}></div>
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
        <span>Step 3: Render your Chart</span>
      </div>
      <p class="code-desc mt-2 mb-1">
        As an example, render a simple pie chart.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c4" bind:this={c4}></div>
            </div>
          </div>
        </div>
      </div>
      <p class="code-desc mt-2 mb-1">
        Here's the HTML template for the above example.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c5" bind:this={c5}></div>
            </div>
          </div>
        </div>
      </div>
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
        Svelte.
      </p>
      <div class="h6 mt-2">
        Consider the example below for integration of FusionTime
      </div>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c6" bind:this={c6}></div>
            </div>
          </div>
        </div>
      </div>
      <p class="code-desc mt-2 mb-1">
        Here's the HTML template for the above example.
      </p>
      <div class="code-view mt-2">
        <div class="card-shadow">
          <div class="card-body p-0">
            <div class="code-panel">
              <div class="codeMirrorDiv" id="c7" bind:this={c7}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- steps end -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h5">Support</div>
      <p>
        <a class="ref-link" href="https://github.com/priyanjitdey94/svelte-fusioncharts/issues" target="_blank">GitHub
          Issues</a> |
        <a class="ref-link" href="mailto:support@fusioncharts.com" target="_blank">Contact FusionCharts Support</a>
      </p>
    </div>
  </div>

  <!-- licensing footer starts -->
  <div class="row">
    <div class="col-12 pt-3">
      <div class="h5">Licensing</div>
      <p>Svelte-FusionCharts module is licensed under open-source, distributed under the terms of the MIT/X11
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