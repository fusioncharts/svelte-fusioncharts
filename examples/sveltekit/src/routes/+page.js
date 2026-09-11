// FusionCharts is browser-only (it touches `document` at import time), and the
// sample components import it at the top level. Rendering this gallery route on
// the client only keeps those imports off the server. See the app README.
export const ssr = false;
