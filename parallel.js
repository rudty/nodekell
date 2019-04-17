'use strict';
const C = require("./core.js");
const default_fetch_count = 10;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    global_fetch_count = Number(count) | default_fetch_count;
};

const loader_iterator = {
    fetch: (gen, fetch_count) => {
        const f = [];
        for (let i = fetch_count; i > 0; --i) {
            const e = gen.next();
            if (e.done) {
                break;
            }
            f.push(e);
        }
        return f;
    },
    call: async (fn, fetch_values) => {
        const f = [];
        for (let i = 0; i < fetch_values.length; ++i) {
            const e = await fetch_values[i];
            const v = await e.value;
            fetch_values[i] = v;
            f.push(fn(v));
        }
        return f;
    }
};

const loader_asyncIterator = {
    fetch: (gen, fetch_count) => {
        const f = [];
        for (let i = fetch_count; i > 0; --i) {
            const e = gen.next();
            f.push(e);
        }
        return f;
    },
    call: async (fn, fetch_values) => {
        const f = [];
        for (let i = 0; i < fetch_values.length; ++i) {
            const e = await fetch_values[i];
            if (e.done) {
                break;
            }
            const v = await e.value;
            fetch_values[i] = v;
            f.push(fn(v));
        }
        return f;
    }
};

const parallel_filter_internal = async function* (fn, g, loader) {
    const fetch_count = global_fetch_count;
    while (true) {
        const f = loader.fetch(g, fetch_count);
        const c = await loader.call(fn, f);

        let i = 0;
        for await (const e of c) {
            if (e) {
                yield f[i];
            }
            ++i;
        }

        if (c.length !== fetch_count) {
            break;
        }
    }
};

const parallel_foreach_internal = async (fn, g, loader) => {
    const fetch_count = global_fetch_count;
    const wait = [];
    while (true) {
        const f = loader.fetch(g, fetch_count);
        const c = await loader.call(fn, f);

        for (let i = c.length - 1; i >= 0; --i) {
            wait.push(c[i]);
        }

        if (c.length !== fetch_count) {
            break;
        }
    }
    return await Promise.all(wait);
};

const parallel_map_internal = async function* (fn, g, loader) {
    const fetch_count = global_fetch_count;

    while (true) {
        const f = loader.fetch(g, fetch_count);
        const c = await loader.call(fn, f);

        for await (const e of c) {
            yield e;
        }

        if (c.length !== fetch_count) {
            break;
        }
    }
};

const parallel_call_internal = (parallel_fn, fn, iter) => {
    const async_it = iter[Symbol.asyncIterator];
    if (async_it) {
        return parallel_fn(fn, iter[Symbol.asyncIterator](), loader_asyncIterator);
    }
    return parallel_fn(fn, iter[Symbol.iterator](), loader_iterator);
};

exports.pmap = C.curry((fn, iter) => parallel_call_internal(parallel_map_internal, fn, iter));
exports.pfilter = C.curry((fn, iter) => parallel_call_internal(parallel_filter_internal, fn, iter));
exports.pforEach = C.curry((fn, iter) => parallel_call_internal(parallel_foreach_internal, fn, iter));