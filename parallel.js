'use strict';
const C = require("./core.js");
const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    global_fetch_count = Number(count) || default_fetch_count;
};

const parallel_filter_internal = async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let i = 0;
    const f = [];
    const v = [];
    for await(const e of iter) {
        f.push(fn(e));
        v.push(e);
        ++i;
        if(i >= fetch_count) {
            for (let j = 0; j < f.length; j++) {
                if(await f[j]) {
                    yield v[j];
                }
            }
            f.splice(0, f.length);
            v.splice(0, v.length);
            i = 0;
        }
    }

    for (let j = 0; j < f.length; j++) {
        if(await f[j]) {
            yield v[j];
        }
    }
};

const parallel_map_internal = async function* (fn, iter) {
    const fetch_count = global_fetch_count;

    let i = 0;
    const f = [];
    for await(const e of iter) {
        f.push(fn(e));
        ++i;
        if(i >= fetch_count) {
            yield* f;
            f.splice(0, f.length);
            i = 0;
        }
    }

    yield* f;
};

exports.pmap = C.curry((fn, iter) => parallel_map_internal(fn, iter));
exports.pfilter = C.curry((fn, iter) => parallel_filter_internal(fn, iter));