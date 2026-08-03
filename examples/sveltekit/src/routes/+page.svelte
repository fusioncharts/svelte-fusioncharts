<script>
  import SimpleChart from '$lib/samples/SimpleChart.svelte';
  import UpdateChartData from '$lib/samples/UpdateChartData.svelte';
  import ChangeChartType from '$lib/samples/ChangeChartType.svelte';
  import ResponsiveCharts from '$lib/samples/ResponsiveCharts.svelte';
  import TriggerEventsFromChart from '$lib/samples/TriggerEventsFromChart.svelte';
  import ExportCharts from '$lib/samples/ExportCharts.svelte';
  import SimpleTimeseries from '$lib/samples/SimpleTimeseries.svelte';

  // The code panel shows each sample's real source via Vite's `?raw` import,
  // so it can never drift from what actually runs.
  import SimpleChartSrc from '$lib/samples/SimpleChart.svelte?raw';
  import UpdateChartDataSrc from '$lib/samples/UpdateChartData.svelte?raw';
  import ChangeChartTypeSrc from '$lib/samples/ChangeChartType.svelte?raw';
  import ResponsiveChartsSrc from '$lib/samples/ResponsiveCharts.svelte?raw';
  import TriggerEventsFromChartSrc from '$lib/samples/TriggerEventsFromChart.svelte?raw';
  import ExportChartsSrc from '$lib/samples/ExportCharts.svelte?raw';
  import SimpleTimeseriesSrc from '$lib/samples/SimpleTimeseries.svelte?raw';

  const samples = [
    { id: 'simple', title: 'Simple Chart', note: 'Initial render', component: SimpleChart, code: SimpleChartSrc },
    { id: 'update', title: 'Update Chart Data', note: 'Re-renders on dataSource change', component: UpdateChartData, code: UpdateChartDataSrc },
    { id: 'type', title: 'Change Chart Type', note: 'chart.chartType() via bind:chart', component: ChangeChartType, code: ChangeChartTypeSrc },
    { id: 'responsive', title: 'Responsive / Resize', note: 'chart.resizeTo() via bind:chart', component: ResponsiveCharts, code: ResponsiveChartsSrc },
    { id: 'events', title: 'Trigger Events', note: 'on:dataplotRollOver / on:dataplotRollOut', component: TriggerEventsFromChart, code: TriggerEventsFromChartSrc },
    { id: 'export', title: 'Export Charts', note: 'FusionCharts.batchExport()', component: ExportCharts, code: ExportChartsSrc },
    { id: 'timeseries', title: 'Simple Timeseries', note: 'FusionTime + {#await}', component: SimpleTimeseries, code: SimpleTimeseriesSrc }
  ];

  let selectedId = $state(samples[0].id);
  const selected = $derived(samples.find((s) => s.id === selectedId));
</script>

<div class="app">
  <header class="topbar">
    <h1>svelte-fusioncharts</h1>
    <span class="badge">Svelte 5 · SvelteKit</span>
  </header>

  <div class="layout">
    <nav class="sidebar">
      <div class="sidebar-heading">Samples</div>
      {#each samples as s (s.id)}
        <button
          class="nav-item"
          class:selected={s.id === selectedId}
          onclick={() => (selectedId = s.id)}
        >
          <span class="nav-title">{s.title}</span>
          <span class="nav-note">{s.note}</span>
        </button>
      {/each}
    </nav>

    <main class="content">
      <div class="viewer card">
        <div class="viewer-head">
          <h2>{selected.title}</h2>
          <span class="note">{selected.note}</span>
        </div>
        <div class="viewer-body">
          {#key selectedId}
            {@const Sample = selected.component}
            <Sample />
          {/key}
        </div>
      </div>

      <div class="code card">
        <div class="code-head">Source</div>
        <pre><code>{selected.code}</code></pre>
      </div>
    </main>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f4f5f7;
    color: #1c1e21;
  }

  .app { max-width: 1160px; margin: 0 auto; padding: 16px; }

  .topbar { display: flex; align-items: baseline; gap: 12px; padding: 8px 4px 20px; }
  .topbar h1 { margin: 0; font-size: 22px; }
  .badge {
    font-size: 12px; color: #5b3fd6; background: #ece8fb;
    padding: 3px 10px; border-radius: 999px; font-weight: 600;
  }

  .layout { display: grid; grid-template-columns: 260px 1fr; gap: 16px; align-items: start; }

  .sidebar {
    position: sticky; top: 16px;
    background: #fff; border: 1px solid #e3e5e8; border-radius: 10px; padding: 8px;
  }
  .sidebar-heading {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
    color: #8a8d91; padding: 8px 10px 6px;
  }
  .nav-item {
    display: flex; flex-direction: column; gap: 2px; width: 100%; text-align: left;
    background: none; border: none; border-radius: 8px; padding: 9px 10px;
    cursor: pointer; color: inherit;
  }
  .nav-item:hover { background: #f4f5f7; }
  .nav-item.selected { background: #efeaff; }
  .nav-title { font-weight: 600; font-size: 14px; }
  .nav-item.selected .nav-title { color: #5b3fd6; }
  .nav-note { font-size: 11px; color: #8a8d91; }

  .content { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
  .card { background: #fff; border: 1px solid #e3e5e8; border-radius: 10px; overflow: hidden; }

  .viewer-head { display: flex; align-items: baseline; gap: 10px; padding: 12px 16px; border-bottom: 1px solid #eef0f2; }
  .viewer-head h2 { font-size: 15px; margin: 0; }
  .note { font-size: 12px; color: #8a8d91; }
  .viewer-body { position: relative; padding: 16px; }

  .code-head {
    font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;
    color: #8a8d91; padding: 10px 16px; border-bottom: 1px solid #eef0f2;
  }
  .code pre {
    margin: 0; padding: 16px; overflow: auto; max-height: 420px;
    background: #0f1021; color: #e6e6f0; font-size: 12.5px; line-height: 1.5;
  }
  .code code { font-family: 'SF Mono', ui-monospace, Menlo, Consolas, monospace; }

  @media (max-width: 820px) {
    .layout { grid-template-columns: 1fr; }
    .sidebar { position: static; }
  }
</style>
