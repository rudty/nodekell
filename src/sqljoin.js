import { curry } from "./curry"
import { seq } from "./seq"

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

const _outerJoin = async function*(f, iter1, iter2) {
    const leftCache = [];
    const rightCache = [];
    const it = seq(iter2);
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

const _innerJoin = async function*(f, iter1, iter2) {
    const leftCache = [];
    const rightCache = [];
    const it = seq(iter2);
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

export const leftInnerJoin = curry(_innerJoin);
export const innerJoin = curry(_innerJoin);
export const rightInnerJoin = curry((f, a, b) => _innerJoin(f, b, a));

export const leftOuterJoin = curry(_outerJoin);
export const outerJoin = curry(_outerJoin);
export const rightOuterJoin = curry((f, a, b) => _outerJoin(f, b, a));
