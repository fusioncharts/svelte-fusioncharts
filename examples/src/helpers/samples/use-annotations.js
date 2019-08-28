const code =
`<script>
  import FusionCharts from 'fusioncharts';
  import Charts from 'fusioncharts/fusioncharts.charts';

  import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import SvelteFC, { fcRoot } from '../../../../index.mjs';

  fcRoot(FusionCharts, Charts, FusionTheme);

  let chartConfig = {
    type: 'spline',
    width: '600',
    height: '400',
    renderAt: 'chart-container',
    dataSource
  };
</script>`,
html =
`<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>`,
data =
`{
  "chart": {
    "caption": "Bakersfield Central - Total footfalls",
    "subCaption": "Last week",
    "xAxisName": "Day",
    "yAxisName": "No. of Visitors (In 1000s)",
    "showValues": "0",
    "theme": "fusion"
  },
  "data": [
    {
      "label": "Mon",
      "value": "15123"
    },
    {
      "label": "Tue",
      "value": "14233"
    },
    {
      "label": "Wed",
      "value": "25507"
    },
    {
      "label": "Thu",
      "value": "9110"
    },
    {
      "label": "Fri",
      "value": "15529"
    },
    {
      "label": "Sat",
      "value": "20803"
    },
    {
      "label": "Sun",
      "value": "19202"
    }
  ],
  "annotations": {
    "groups": [
      {
        "id": "anchor-highlight",
        "items": [
          {
            "id": "high-star",
            "type": "circle",
            "x": "$dataset.0.set.2.x",
            "y": "$dataset.0.set.2.y",
            "radius": "12",
            "color": "#6baa01",
            "border": "2",
            "borderColor": "#f8bd19"
          },
          {
            "id": "label",
            "type": "text",
            "text": "Highest footfall 25.5K",
            "fillcolor": "#6baa01",
            "rotate": "90",
            "x": "$dataset.0.set.2.x+75",
            "y": "$dataset.0.set.2.y-2"
          }
        ]
      }
    ]
  }
}`;

export default {
  code,
  html,
  data
};
