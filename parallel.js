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