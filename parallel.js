'use strict';
const C = require("./core.js");
const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("count > 0 required");
    }
    global_fetch_count = count || default_fetch_count;
};

const fetch_iterator = async (f, fn, iter) => {
    const fetch_count = global_fetch_count; 
    const g = iter[Symbol.iterator]();
    for (let i = fetch_count; i > 0; --i) {
        const e = g.next();
        if (e.done) {
            break;
        }
        f.push(fn(await e.value));
    }
    return g;
};

const fetch_asyncIterator = async (f, fn, iter) => {
    const fetch_count = global_fetch_count; 
    const g = iter[Symbol.asyncIterator]();
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.push(fn(e.value));
    }
    return g;
};

const fetch_internal = (f, fn, iter) => {
    if (iter[Symbol.asyncIterator]) {
        return fetch_asyncIterator(f, fn, iter);
    }
    return fetch_iterator(f, fn, iter);
};

exports.pmap = C.curry(async function* (fn, iter) {
    const f = [];
    const g = await fetch_internal(f, fn, iter);
    for await (const e of g) {
        yield await f.shift();
        f.push(fn(e));
    }

    yield* f;
});

const pfmap = C.curry(async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let f = [];
    for await (const e of iter) {
        const len = f.push(fn(e));
        if(len >= fetch_count) {
            for (let i = 0; i < f.length; ++i) {
                yield* await f[i];
            }
            f = [];
        }
    }

    for (let i = 0; i < f.length; ++i) {
        yield* await f[i];
    }
});
exports.pfmap = pfmap;
exports.pflatMap = pfmap;

const pfilter_call_internal = async function* (f, v) {
    for(let i = 0; i < f.length; ++i) {
        if (await f[i]) {
            yield v[i];
        }
    }
};

exports.pfilter = C.curry(async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let f = [];
    let v = [];
    for await(const e of iter) {
        const len = f.push(fn(e));
        v.push(e);
        if(len >= fetch_count) {
            yield* pfilter_call_internal(f, v); 
            f = [];
            v = [];
        }
    }

    yield* pfilter_call_internal(f, v);
});

const pcalls_internal = async function* (iter) {
    const fetch_count = global_fetch_count;
    let f = [];
    for await(const e of iter) {
        const len = f.push(e());
        if(len >= fetch_count) {
            yield* f;
            f = [];
        }
    } 
    yield* f;
};

exports.pcalls = C.curry(async function* (...a) {
    if (a.length === 1) {
        if (a[0][Symbol.iterator] || a[0][Symbol.asyncIterator]) {
            yield* pcalls_internal(a[0]);
            return;
        }
    }
    yield* pcalls_internal(a);
});