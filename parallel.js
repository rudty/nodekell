'use strict';
const C = require("./core.js");
const LinkedList = require("./linkedlist.js");

const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

exports.parallel_set_fetch_count = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("count > 0 required");
    }
    global_fetch_count = count || default_fetch_count;
};

const fetch_map_internal = async (f, fn, iter) => {
    const fetch_count = global_fetch_count - 1; 
    const g = C.seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.addLast(fn(e.value));
    }
    return g;
};

exports.pmap = C.curry(async function* (fn, iter) {
    const f = new LinkedList();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.addLast(fn(e));
        yield f.removeFirst();
    }

    yield* f.asyncRemoveIterator();
});

const pfmap = C.curry(async function* (fn, iter) {
    const f = new LinkedList();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.addLast(fn(e));
        yield* await f.removeFirst();
    }

    yield* f.asyncFlatRemoveIterator();
});
exports.pfmap = pfmap;
exports.pflatMap = pfmap;

const fetch_filter_internal = async (f, v, fn, iter) => {
    //fetch (n - 1) here
    const fetch_count = global_fetch_count - 1;
    const g = C.seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const { done, value } = await g.next();
        if (done) {
            break;
        }
        f.addLast(fn(value));
        v.addLast(value);
    }
    return g;
};

exports.pfilter = C.curry(async function* (fn, iter) {
    const f = new LinkedList();
    const v = new LinkedList();
    const g = await fetch_filter_internal(f, v, fn, iter);
    for await (const e of g) {
        f.addLast(fn(e));
        v.addLast(e);

        const c = v.removeFirst();
        if (await f.removeFirst()) {
            yield c;
        }
    }

    while (!v.isEmpty()) {
        const c = v.removeFirst(); 
        if (await f.removeFirst()) {
            yield c;
        }
    }
});

const fetch_call_internal =  async (f, iter) => { 
    const fetch_count = global_fetch_count;
    const g = C.seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.addLast(e.value());
    }
    return g;
}

const pcalls_internal = async function* (iter) {

    const f = new LinkedList();
    const g = await fetch_call_internal(f, iter);
    
    for await(const e of g) {
        f.addLast(e());
        yield f.removeFirst();
    } 

    yield* f.asyncRemoveIterator();
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