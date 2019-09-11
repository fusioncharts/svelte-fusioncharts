(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Fusioncharts = {}));
}(this, function (exports) { 'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = current_component;
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    var Events = [
      "beforeLinkedItemOpen",
      "linkedItemOpened",
      "beforeLinkedItemClose",
      "linkedItemClosed",
      "printReadyStateChange",
      "dataLoadRequestCompleted",
      "dataLoadError",
      "dataLoadCancelled",
      "dataLoadRequestCancelled",
      "dataUpdated",
      "dataUpdateCancelled",
      "dataLoadRequested",
      "beforeDataUpdate",
      "realTimeUpdateComplete",
      "chartCleared",
      "slicingEnd",
      "slicingStart",
      "entityRollOut",
      "entityRollOver",
      "entityClick",
      "connectorRollOver",
      "connectorRollOut",
      "connectorClick",
      "markerRollOver",
      "markerRollOut",
      "markerClick",
      "pageNavigated",
      "rotationEnd",
      "rotationStart",
      "centerLabelRollover",
      "centerLabelRollout",
      "centerLabelClick",
      "centerLabelChanged",
      "chartClick",
      "chartMouseMove",
      "chartRollOver",
      "chartRollOut",
      "backgroundLoaded",
      "backgroundLoadError",
      "legendItemClicked",
      "legendItemRollover",
      "legendItemRollout",
      "logoRollover",
      "logoRollout",
      "logoClick",
      "logoLoaded",
      "logoLoadError",
      "beforeExport",
      "exported",
      "exportCancelled",
      "beforePrint",
      "printComplete",
      "printCancelled",
      "dataLabelClick",
      "dataLabelRollOver",
      "dataLabelRollOut",
      "scrollStart",
      "scrollEnd",
      "onScroll",
      "zoomReset",
      "zoomedOut",
      "zoomedIn",
      "zoomed",
      "zoomModeChanged",
      "pinned",
      "dataRestored",
      "beforeDataSubmit",
      "dataSubmitError",
      "dataSubmitted",
      "dataSubmitCancelled",
      "chartUpdated",
      "nodeAdded",
      "nodeUpdated",
      "nodeDeleted",
      "connectorAdded",
      "connectorUpdated",
      "connectorDeleted",
      "labelAdded",
      "labelDeleted",
      "selectionRemoved",
      "selectionStart",
      "selectionEnd",
      "labelClick",
      "labelRollOver",
      "labelRollOut",
      "labelDragStart",
      "labelDragEnd",
      "dataplotDragStart",
      "dataplotDragEnd",
      "processClick",
      "processRollOver",
      "processRollOut",
      "categoryClick",
      "categoryRollOver",
      "categoryRollOut",
      "milestoneClick",
      "milestoneRollOver",
      "milestoneRollOut",
      "chartTypeChanged",
      "overlayButtonClick",
      "loaded",
      "rendered",
      "drawComplete",
      "renderComplete",
      "dataInvalid",
      "dataXMLInvalid",
      "dataLoaded",
      "noDataToDisplay",
      "legendPointerDragStart",
      "legendPointerDragStop",
      "legendRangeUpdated",
      "alertComplete",
      "realTimeUpdateError",
      "dataplotRollOver",
      "dataplotRollOut",
      "dataplotClick",
      "linkClicked",
      "beforeRender",
      "renderCancelled",
      "beforeResize",
      "resized",
      "resizeCancelled",
      "beforeDispose",
      "disposed",
      "disposeCancelled",
      "linkedChartInvoked",
      "beforeDrillDown",
      "drillDown",
      "beforeDrillUp",
      "drillUp",
      "drillDownCancelled",
      "drillUpCancelled"
    ];

    const ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'],
        charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        isResizeRequired = (oldConfig, newConfig) => {
            let { width, height } = oldConfig,
                newWidth = newConfig.width,
                newHeight = newConfig.height;

            if (width !== newWidth || height !== newHeight) {
                return true;
            }
            return false;
        },
        isChartTypeChanged = (oldConfig, newConfig) => {
            return (oldConfig.type !== newConfig.type);
        },
        cloneObject = (arg, purpose = 'clone') => {
            if ((ATOMIC_DATA_TYPE.indexOf(typeof arg) > -1) || arg === null) {
                return arg;
            }

            if (Array.isArray(arg)) {
                let i,
                    len,
                    arr = [];

                for (i = 0, len = arg.length; i < len; i++) {
                    arr.push(cloneObject(arg[i], purpose));
                }

                return arr;
            } else if (typeof arg === 'object') {
                let cloneObj = {},
                    key;

                for (key in arg) {
                    if (key === 'data') {
                        if (arg[key] && arg[key]._dataStore) {
                            cloneObj[key] = (purpose === 'clone') ? arg[key] : '-'; 
                        } else {
                            cloneObj[key] = cloneObject(arg[key], purpose);
                        }
                    } else {
                        cloneObj[key] = cloneObject(arg[key], purpose);
                    }
                }

                return cloneObj;
            }
        },
        isDataSourceUpdated = (oldConfig, newConfig) => {
            return JSON.stringify(cloneObject(oldConfig.dataSource, 'diff')) !== JSON.stringify(cloneObject(newConfig.dataSource, 'diff'));
        },
        createUniqueId = (length = 20) => {
            let i,
                result = '',
                charactersLength = charSet.length;

            for (i = 0; i < length; i++) {
               result += charSet.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         };

    /* src/index.svelte generated by Svelte v3.8.1 */

    function create_fragment(ctx) {
    	var div;

    	return {
    		c() {
    			div = element("div");
    			attr(div, "class", ctx.className);
    			attr(div, "style", ctx.inlineStyle);
    			attr(div, "id", ctx.uniqueDivId);
    		},

    		m(target, anchor) {
    			insert(target, div, anchor);
    		},

    		p(changed, ctx) {
    			if (changed.className) {
    				attr(div, "class", ctx.className);
    			}

    			if (changed.inlineStyle) {
    				attr(div, "style", ctx.inlineStyle);
    			}
    		},

    		i: noop,
    		o: noop,

    		d(detaching) {
    			if (detaching) {
    				detach(div);
    			}
    		}
    	};
    }

    let FusionCharts;

    function fcRoot (core, ...modules) {
        FusionCharts = core;
        modules.forEach(m => {
            if ((m.getName && m.getType) || (m.name && m.type)) {
                core.addDep(m);
            } else {
                m(core);
            }
        });
    }

    function instance($$self, $$props, $$invalidate) {
    	

        // props
        let { id, className = '', inlineStyle = '', type, renderAt, width, height, dataFormat = 'json', dataSource, chart } = $$props;

        let oldChartConfig,
            chartConfig,
            eventListerners = [];

        const dispatch = createEventDispatcher(),
            uniqueDivId = createUniqueId();
        /**
         * Life cycle method sequence
         * beforeUpdate -> onMount -> afterUpdate (during intial render)
         * beforeUpdate -> afterUpdate (during re-render)
         */
        beforeUpdate(() => {
            $$invalidate('renderAt', renderAt = uniqueDivId);
            chartConfig = {
                id,
                type,
                renderAt,
                width,
                height,
                dataFormat,
                dataSource: cloneObject(dataSource)
            };
        });
        onMount(() => {
            if (!FusionCharts) {
                console.warn('Invalid FusionCharts constructor');
            } else {
                FusionCharts.ready(function () {
                    $$invalidate('chart', chart = new FusionCharts(chartConfig));
                    chart.render();
                });

                Events.forEach((event, index) => {
                    eventListerners.push(e => {
                        dispatch(event, e);
                    });
                    FusionCharts.addEventListener(event, eventListerners[index]);
                });
            }
        });
        afterUpdate(() => {
            // If not the first render
            if (oldChartConfig) {
                if (isResizeRequired(oldChartConfig, chartConfig)) {
                    chart.resizeTo(chartConfig.width, chartConfig.height);
                }

                if (isChartTypeChanged(oldChartConfig, chartConfig)) {
                    chart.chartType(chartConfig.type, chartConfig);
                } else if (isDataSourceUpdated(oldChartConfig, chartConfig)) {
                    chart.setJSONData(chartConfig.dataSource);
                }
            }
            oldChartConfig = cloneObject(chartConfig);
        });
        onDestroy(() => {
            chart.dispose();
            Events.forEach((event, index) => {
                FusionCharts.removeEventListener(event, eventListerners[index]);
            });
        });

    	$$self.$set = $$props => {
    		if ('id' in $$props) $$invalidate('id', id = $$props.id);
    		if ('className' in $$props) $$invalidate('className', className = $$props.className);
    		if ('inlineStyle' in $$props) $$invalidate('inlineStyle', inlineStyle = $$props.inlineStyle);
    		if ('type' in $$props) $$invalidate('type', type = $$props.type);
    		if ('renderAt' in $$props) $$invalidate('renderAt', renderAt = $$props.renderAt);
    		if ('width' in $$props) $$invalidate('width', width = $$props.width);
    		if ('height' in $$props) $$invalidate('height', height = $$props.height);
    		if ('dataFormat' in $$props) $$invalidate('dataFormat', dataFormat = $$props.dataFormat);
    		if ('dataSource' in $$props) $$invalidate('dataSource', dataSource = $$props.dataSource);
    		if ('chart' in $$props) $$invalidate('chart', chart = $$props.chart);
    	};

    	return {
    		id,
    		className,
    		inlineStyle,
    		type,
    		renderAt,
    		width,
    		height,
    		dataFormat,
    		dataSource,
    		chart,
    		uniqueDivId
    	};
    }

    class Index extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, ["id", "className", "inlineStyle", "type", "renderAt", "width", "height", "dataFormat", "dataSource", "chart"]);
    	}
    }

    exports.default = Index;
    exports.fcRoot = fcRoot;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
