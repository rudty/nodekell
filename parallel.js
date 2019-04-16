'use strict';
const C = require("./core.js");
const default_fetch_count = 50;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    global_fetch_count = Number(count) | default_fetch_count;
};

const object_is_not_iterable = () => { throw new Error("object is not iterable"); }

const fetch_values_iterator = (gen, fetch_count) => {
    const v = [];
    for (let i = fetch_count; i > 0; --i) {
        const e = gen.next();
        v.push(e);
    }
    return v;
};

const fetch_values_asyncIterator = (gen, fetch_count) => await Promise.all(fetch_values_iterator(gen, fetch_count));

const parallel_filter_internal = async function* (fn, g, fetch_operator) {
    const fetch_count = global_fetch_count;
    while (true) {
        const v = fetch_operator(g, fetch_count);
        const f = [];
        for (let i = 0; i < fetch_count; ++i) {
            if (v[i].done) {
                break;
            }
            f.push(fn(v[i].value));
        };

        const r = await Promise.all(f);
        for (let i = 0; i < r.length; ++i) {
            if (r[i]) {
                yield v[i].value;
            }
        }

        if (r.length !== fetch_count) {
            return;
        }
    }
};

const parallel_map_internal = async function* (fn, g, fetch_operator) {
    const fetch_count = global_fetch_count;

    while (true) {
        const v = fetch_operator(g, fetch_count);
        const f = [];
        for (let i = 0; i < fetch_count; ++i) {
            if (v[i].done) {
                break;
            }
            f.push(fn(v[i].value));
        };

        const r = await Promise.all(f);
        yield* r;

        if (r.length !== fetch_count) {
            return;
        }
    }
};

const parallel_call = (parallel_fn, fn, iter) => {
    const async_it = iter[Symbol.asyncIterator];
    if (async_it) {
        return parallel_fn(fn, async_it(), fetch_values_asyncIterator);
    }

    const it = iter[Symbol.iterator];
    if (it) {
        return parallel_fn(fn, it(), fetch_values_iterator);
    }

    object_is_not_iterable();
};

exports.parallel_map = C.curry((fn, iter) => parallel_call(parallel_map_internal, fn, iter));
exports.parallel_filter = C.curry((fn, iter) => parallel_call(parallel_filter_internal, fn, iter));
