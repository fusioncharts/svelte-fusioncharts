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

const ATOMIC_DATA_TYPE = ['string', 'number', 'function', 'boolean', 'undefined'],
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
    };

/* src/index.svelte generated by Svelte v3.8.1 */

function create_fragment(ctx) {
	var div;

	return {
		c() {
			div = element("div");
			attr(div, "class", ctx.className);
			attr(div, "id", ctx.renderAt);
		},

		m(target, anchor) {
			insert(target, div, anchor);
		},

		p(changed, ctx) {
			if (changed.className) {
				attr(div, "class", ctx.className);
			}

			if (changed.renderAt) {
				attr(div, "id", ctx.renderAt);
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
    let { id, className = '', type = 'column2d', renderAt = '__svelte_fc_chart_container', width = '600', height = '350', dataFormat = 'json', dataSource = {}, events = {} } = $$props;

    let chart,
        oldChartConfig,
        chartConfig;

    /**
     * Life cycle method sequence
     * beforeUpdate -> onMount -> afterUpdate (during intial render)
     * beforeUpdate -> afterUpdate (during re-render)
     */
    beforeUpdate(() => {
        chartConfig = {
            id,
            type,
            renderAt,
            width,
            height,
            dataFormat,
            dataSource: cloneObject(dataSource),
            events
        };
    });
    onMount(() => {
        if (!FusionCharts) {
            console.warn('Invalid FusionCharts constructor');
        } else {
            FusionCharts.ready(function () {
                chart = new FusionCharts(chartConfig);
                chart.render();
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


            if (chartConfig.events || oldChartConfig.events) {
                let oldEvts = oldChartConfig.events,
                newEvts = chartConfig.events;

                // For all old events which got removed, remove them
                for (let evt in oldEvts) {
                    if (!newEvts || !newEvts[evt] || newEvts[evt] !== oldEvts[evt]) {
                        chart.removeEventListener(evt, oldEvts[evt]);
                    }
                }
                // add new evet listeners
                for (let evt in newEvts) {
                    if (!oldEvts || !oldEvts[evt] || newEvts[evt] !== oldEvts[evt]) {
                        chart.addEventListener(evt, newEvts[evt]);
                    }
                }
                
                
            }
        }
        oldChartConfig = cloneObject(chartConfig);
    });
    onDestroy(() => {
        chart.dispose();
    });

	$$self.$set = $$props => {
		if ('id' in $$props) $$invalidate('id', id = $$props.id);
		if ('className' in $$props) $$invalidate('className', className = $$props.className);
		if ('type' in $$props) $$invalidate('type', type = $$props.type);
		if ('renderAt' in $$props) $$invalidate('renderAt', renderAt = $$props.renderAt);
		if ('width' in $$props) $$invalidate('width', width = $$props.width);
		if ('height' in $$props) $$invalidate('height', height = $$props.height);
		if ('dataFormat' in $$props) $$invalidate('dataFormat', dataFormat = $$props.dataFormat);
		if ('dataSource' in $$props) $$invalidate('dataSource', dataSource = $$props.dataSource);
		if ('events' in $$props) $$invalidate('events', events = $$props.events);
	};

	return {
		id,
		className,
		type,
		renderAt,
		width,
		height,
		dataFormat,
		dataSource,
		events
	};
}

class Index extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, ["id", "className", "type", "renderAt", "width", "height", "dataFormat", "dataSource", "events"]);
	}
}

export default Index;
export { fcRoot };
