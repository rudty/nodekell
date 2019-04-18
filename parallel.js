'use strict';
const C = require("./core.js");
const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    global_fetch_count = Number(count) || default_fetch_count;
};

const async_call = async (fn, fetch_values) => {
    const c = [];
    for (let i = 0; i < fetch_values.length; ++i) {
        const e = await fetch_values[i];
        fetch_values[i] = e;
        c.push(fn(e));
    }
    return c;
};

const fetch_iterator = (gen, fetch_count) => {
    const f = [];
    for (let i = fetch_count; i > 0; --i) {
        const e = gen.next();
        if (e.done) {
            break;
        }
        f.push(e.value);
    }
    return f;
};

const fetch_asyncIterator = async (gen, fetch_count) => {
    const f = [];
    for (let i = fetch_count; i > 0; --i) {
        const e = await gen.next();
        if (e.done) {
            break;
        }
        f.push(e.value);
    }
    return f;
};
const parallel_filter_internal = async function* (fn, g, fetch_operator) {
    const fetch_count = global_fetch_count;
    while (true) {
        const f = await fetch_operator(g, fetch_count);
        const c = await async_call(fn, f);

        for (let i = 0; i < c.length; ++i) {
            if (await c[i]) {
                yield f[i];
            }
        }

        if (c.length !== fetch_count) {
            break;
        }
    }
};

const parallel_map_internal = async function* (fn, g, fetch_operator) {
    const fetch_count = global_fetch_count;

    while (true) {
        const f = await fetch_operator(g, fetch_count);
        const c = await async_call(fn, f);

        for (let i = 0; i < c.length; ++i) {
            yield await c[i];
        }

        if (c.length !== fetch_count) {
            break;
        }
    }
};

const parallel_call_internal = (parallel_fn, fn, iter) => {
    const async_it = iter[Symbol.asyncIterator];
    if (async_it) {
        return parallel_fn(fn, iter[Symbol.asyncIterator](), fetch_asyncIterator);
    }
    return parallel_fn(fn, iter[Symbol.iterator](), fetch_iterator);
};

exports.pmap = C.curry((fn, iter) => parallel_call_internal(parallel_map_internal, fn, iter));
exports.pfilter = C.curry((fn, iter) => parallel_call_internal(parallel_filter_internal, fn, iter));