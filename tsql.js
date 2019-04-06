'use strict';
const C = require("./core.js");

exports.groupBy = C.curry(async (f, iter) => {
    const m = new Map();
    for await(const e of iter) {
        const k = await f(e);
        if (m.has(k)) {
            const v = m.get(k);
            v.push(e);
        } else {
            m.set(k, [e]);
        }
    }
    return m;
});


const combineMap = (a, b) => new Map([...b, ...a]);


/**
 * support iterable + set method
 * a is overwrite b value
 */
const combineCollection = (a, b) => {
    const r = new a.constructor();
    for (const e of b) {
        r.set(...e);
    }
    for (const e of a) {
       r.set(...e);
    }
    return r;
};

const combineObject = (a, b) => {
    const c = {};
    Object.assign(c, a);
    Object.assign(c, b);
    return c;
};

const combine = (a, b) => {
    if (a.constructor !== b.constructor) {
        throw new Error("join/combine object: object is not same");
    }

    if (a instanceof Map) {
        return combineMap(a, b);
    }

    if (a[Symbol.iterator] && a.set && typeof(a.set) === "function") {
        return combineCollection(a, b);
    }

    if (a instanceof Object) {
        return combineObject(a, b);
    }

    throw new Error("join/combine object: not support type");
};

const outerJoin = C.curry(async function*(f, a, b) {
    const cache = [];
    start: for await(const e of a) {
        for (const c of cache) {
            if (await f(e, c)) {
                yield combine(e, c);
                continue start;
            }
        }

        for (const c of b) {
            if (await f(e, c)) {
                yield combine(e, c);
                cache.push(c);
                continue start;
            }
        }

        yield e;
    }
});

const innerJoin = C.curry(async function*(f, a, b) {
    const cache = [];
    start: for await(const e of a) {
        for (const c of cache) {
            if (await f(e, c)) {
                yield combine(e, c);
                continue start;
            }
        }

        for (const c of b) {
            if (await f(e, c)) {
                yield combine(e, c);
                cache.push(c);
                continue start;
            }
        }
    }
});

exports.innerJoin = innerJoin;
exports.leftInnerJoin = innerJoin;
exports.rightInnerJoin = C.curry((f, a, b) => innerJoin(f, b, a));
exports.outerJoin = outerJoin;
exports.leftOuterJoin = outerJoin;
exports.rightOuterJoin = C.curry((f, a, b) => outerJoin(f, b, a));