import { SvelteComponent } from 'svelte';

export interface SvelteFusionChartsProps {
  /** The chart id passed through to the FusionCharts constructor. */
  id?: string;
  /** Class applied to the container div. */
  className?: string;
  /** Inline style applied to the container div. */
  inlineStyle?: string;
  /** FusionCharts chart type, e.g. "column2d", "pie3d", "timeseries". */
  type: string;
  /** Container id to render at. Managed internally; usually omitted. */
  renderAt?: string;
  /** Chart width, e.g. "100%" or 600. */
  width?: string | number;
  /** Chart height, e.g. "400" or 400. */
  height?: string | number;
  /** Data format. Defaults to "json". */
  dataFormat?: string;
  /** The chart data source object/string. */
  dataSource: unknown;
  /**
   * Bound back to the live FusionCharts instance after render.
   * Use `bind:chart` to access chart methods.
   */
  chart?: unknown;
}

/**
 * Map of every FusionCharts event the wrapper forwards as a Svelte event.
 * Listen with `on:<eventName>` (e.g. `on:dataplotClick`).
 */
export interface SvelteFusionChartsEvents {
  [eventName: string]: CustomEvent<unknown>;
}

/**
 * Official Svelte wrapper for FusionCharts.
 * Compatible with both Svelte 4 and Svelte 5.
 */
export default class SvelteFusionCharts extends SvelteComponent<
  SvelteFusionChartsProps,
  SvelteFusionChartsEvents
> {}

/**
 * Registers the FusionCharts core and any chart/theme/module dependencies.
 * Call once before rendering charts.
 *
 * @param core The FusionCharts core constructor.
 * @param modules Chart definitions, themes, or module initializers.
 */
export function fcRoot(core: unknown, ...modules: unknown[]): void;
