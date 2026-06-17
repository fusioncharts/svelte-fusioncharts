<script>
  import SimpleChart from './samples/SimpleChart.svelte';
  import UpdateChartData from './samples/UpdateChartData.svelte';
  import ChangeChartType from './samples/ChangeChartType.svelte';
  import ResponsiveCharts from './samples/ResponsiveCharts.svelte';
  import TriggerEventsFromChart from './samples/TriggerEventsFromChart.svelte';
  import ExportCharts from './samples/ExportCharts.svelte';
  import SimpleTimeseries from './samples/SimpleTimeseries.svelte';

  // A representative set of samples covering the wrapper's main code paths:
  // initial render, data update, chart-type change, resize, events, export and timeseries.
  const samples = [
    { title: 'Simple Chart', note: 'Initial render', component: SimpleChart },
    { title: 'Update Chart Data', note: 'Re-renders on dataSource change', component: UpdateChartData },
    { title: 'Change Chart Type', note: 'chart.chartType() via bind:chart', component: ChangeChartType },
    { title: 'Responsive / Resize', note: 'chart.resizeTo() via bind:chart', component: ResponsiveCharts },
    { title: 'Trigger Events', note: 'on:dataplotRollOver / on:dataplotRollOut', component: TriggerEventsFromChart },
    { title: 'Export Charts', note: 'FusionCharts.batchExport()', component: ExportCharts },
    { title: 'Simple Timeseries', note: 'FusionTime + {#await}', component: SimpleTimeseries }
  ];
</script>

<main>
  <header>
    <h1>svelte-fusioncharts</h1>
    <p>Running on <strong>Svelte {'5'}</strong> via Vite + <code>@sveltejs/vite-plugin-svelte</code>.</p>
  </header>

  {#each samples as { title, note, component: Sample } (title)}
    <section class="sample">
      <div class="sample-head">
        <h2>{title}</h2>
        <span class="note">{note}</span>
      </div>
      <div class="sample-body">
        <Sample />
      </div>
    </section>
  {/each}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f7f8fa;
    color: #1c1e21;
  }

  main {
    max-width: 920px;
    margin: 0 auto;
    padding: 24px 16px 64px;
  }

  header h1 {
    margin: 0 0 4px;
  }

  header p {
    margin: 0 0 24px;
    color: #555;
  }

  .sample {
    background: #fff;
    border: 1px solid #e3e5e8;
    border-radius: 8px;
    margin-bottom: 24px;
    overflow: hidden;
  }

  .sample-head {
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid #eef0f2;
  }

  .sample-head h2 {
    font-size: 16px;
    margin: 0;
  }

  .note {
    font-size: 12px;
    color: #8a8d91;
  }

  .sample-body {
    position: relative;
    height: 520px;
    padding: 16px;
  }
</style>
