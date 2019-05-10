'use strict';
const C = require("./core.js");
const P = require("./prelude.js");

exports.groupBy = C.curry(async (f, iter) => {
    const m = new Map();
    for await (const e of iter) {
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

const concat = C.curry(async function* (a, b) {
    yield* a;
    yield* b;
});
exports.concat = concat;
exports.union = concat;

const sortBy = C.curry(async function* (f, order, iter) {
    order = order.trim().toLowerCase();

    const t = [];
    const m = new Map();

    for await (const e of iter) {
        t.push(e);
        if (!m.has(e)) {
            m.set(e, await f(e));
        }
    }

    yield* t.sort((a, b) => {
        const ma = m.get(a);
        const mb = m.get(b);

        switch (order) {
            case 'asc':
                return ma > mb ? 1 : ma < mb ? -1 : 0;
            case 'dsc':
                return ma < mb ? 1 : ma > mb ? -1 : 0;
            default:
                throw new Error('please set order parameter to asc or dsc');
        }
    });
});

exports.orderBy = sortBy;
exports.order = sortBy(C.identity, 'asc');

exports.sortBy = sortBy;
exports.sort = sortBy(C.identity, 'asc');

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

const combineObject = (a, b) => Object.assign({}, b, a);

const combine = (a, b) => {
    if (a.constructor !== b.constructor) {
        throw new Error("join/combine object: object is not same");
    }

    if (a instanceof Map) {
        return combineMap(a, b);
    }

    if (a[Symbol.iterator] && a.set && typeof (a.set) === "function") {
        return combineCollection(a, b);
    }

    if (a instanceof Object) {
        return combineObject(a, b);
    }

    throw new Error("join/combine object: not support type");
};

const outerJoin = async function* (f, iter1, iter2) {
    const leftCache = [];
    const rightCache = [];
    const it = C.seq(iter2);
    start: for await (const e of iter1) {
        leftCache.push(e);
        for (const c of rightCache) {
            if (await f(e, c)) {
                yield combine(e, c);
                continue start;
            }
        }

        while (true) {
            const { value, done } = await it.next();
            if (done) {
                break;
            }
            rightCache.push(value);
            if (await f(e, value)) {
                yield combine(e, value);
                continue start;
            }
        }

        yield e;
    }

    for await (const e of it) {
        for (const c of leftCache) {
            if (await f(c, e)) {
                yield combine(c, e);
            }
        }
    }
};

const innerJoin = async function* (f, iter1, iter2) {
    const leftCache = [];
    const rightCache = [];
    const it = C.seq(iter2);
    start: for await (const e of iter1) {
        leftCache.push(e);
        for (const c of rightCache) {
            if (await f(e, c)) {
                yield combine(e, c);
                continue start;
            }
        }

        while (true) {
            const { value, done } = await it.next();
            if (done) {
                break;
            }
            rightCache.push(value);
            if (await f(e, value)) {
                yield combine(e, value);
                continue start;
            }
        }
    }

    for await (const e of it) {
        for (const c of leftCache) {
            if (await f(c, e)) {
                yield combine(c, e);
            }
        }
    }
};

exports.leftInnerJoin = exports.innerJoin = C.curry(innerJoin);
exports.rightInnerJoin = C.curry((f, a, b) => innerJoin(f, b, a));

exports.leftOuterJoin = exports.outerJoin = C.curry(outerJoin);
exports.rightOuterJoin = C.curry((f, a, b) => outerJoin(f, b, a));


