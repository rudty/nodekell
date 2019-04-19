'use strict';
const C = require("./core.js");
const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    global_fetch_count = Number(count) || default_fetch_count;
};

const filter_each_internal = async function*(f) {
    for(let i = 0; i < f.length; ++i) {
        if(await f[i][0]) {
            yield f[i][1];
        }
    }
};

const pfilter_internal = async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let i = 0;
    let f = [];
    for await(const e of iter) {
        f.push([fn(e), e]);
        ++i;
        if(i >= fetch_count) {
            yield* filter_each_internal(f); 
            f = [];
            i = 0;
        }
    }

    yield* filter_each_internal(f);
};

const pmap_internal = async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let i = 0;
    const f = [];
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
};

exports.pmap = C.curry((fn, iter) => pmap_internal(fn, iter));
exports.pfilter = C.curry((fn, iter) => pfilter_internal(fn, iter));