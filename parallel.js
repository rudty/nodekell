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

exports.pmap = C.curry(async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let i = 0;
    let f = [];
    for await(const e of iter) {
        f.push(fn(e));
        ++i;
        if(i >= fetch_count) {
            yield* f;
            f = [];
            i = 0;
        }
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

    let i = 0;
    let f = [];
    let v = [];
    for await(const e of iter) {
        f.push(fn(e));
        v.push(e);
        ++i;
        if(i >= fetch_count) {
            yield* pfilter_call_internal(f, v); 
            f = [];
            v = [];
            i = 0;
        }
    }

    yield* pfilter_call_internal(f, v);
});

const pcalls_internal = async function* (iter) {
    const fetch_count = global_fetch_count;
    let f = [];
    let i = 0;
    for await(const e of iter) {
        f.push(e());
        ++i;
        if(i >= fetch_count) {
            yield* f;
            f = [];
            i = 0;
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