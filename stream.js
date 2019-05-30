'use strict';
const C = require("./core.js");
const P = require("./prelude.js");

exports.rangeOf = (...a) => P.fmap(C.identity, a);

exports.firstOrGet = C.curry(async (supply, iter) => {
    for await (const e of iter) {
        return e;
    }
    supply = await supply;
    if (supply instanceof Function) {
        return await supply();
    }
    return supply;
});

exports.emptyThen = C.curry(async function*(supply, iter) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }

    supply = await supply;
    if (supply instanceof Function) {
        yield* await supply();
    } else {
        yield* supply;
    }
});

/**
 * make array
 * iterator to array
 */
const collect = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};
exports.collect = collect;

exports.collectMap = async (iter) => new Map(await collect(iter));
exports.collectSet = async (iter) => new Set(await collect(iter));

/**
 * [a,1],[b,2],[c,3]]  => {a:1,b:2,c:3} 
 */
exports.collectObject = async (iter) => {
    const c = await collect(iter);
    const o = {};
    for (const e of c) {
        if (!Array.isArray(e)) {
            throw new TypeError("value is not array");
        }
        o[e[0]] = e[1];
    }
    return o;
};

exports.forEach = C.curry(async (fn, iter) => {
    const wait = [];
    for await (const e of iter) {
        wait.push(fn(e));
    }
    return Promise.all(wait);
});

exports.forEachIndexed = C.curry(async (fn, iter) => {
    const wait = [];
    let i = 0;
    for await (const e of iter) {
        wait.push(i++, fn(e));
    }
    return Promise.all(wait);
});

const distinctBy = C.curry(async function*(f, iter) {
    const s = new Set();
    for await (const e of iter) {
        const d = await f(e);
        if (!s.has(d)) {
            s.add(d);
            yield e;
        }
    }
});
exports.distinctBy = distinctBy;
exports.distinct = (iter) => distinctBy(C.identity, iter);

exports.some = C.curry(async (f, iter) => {
    for await (const e of iter) {
        if (await f(e)) {
            return true;
        }
    }
    return false;
});

exports.every = C.curry(async (f, iter) => {
    for await (const e of iter) {
        if (!(await f(e))) {
            return false;
        }
    }
    return true;
});

const maxBy = C.curry(async (f, iter) => {
    const g = C.seq(iter);
    const head = await g.next();
    if (head.done) {
        throw new Error("empty iter");
    }
    let m = head.value;
    let c = await f(m);
    for await (const e of g) {
        const k = await f(e);
        if (k > c) {
            m = e;
            c = k;
        }
    }
    return m;
});
exports.maxBy = maxBy;

const minBy = C.curry(async (f, iter) => {
    const g = C.seq(iter);
    const head = await g.next();
    if (head.done) {
        throw new Error("empty iter");
    }
    let m = head.value;
    let c = await f(m);

    for await (const e of g) {
        const k = await f(e);
        if (k < c) {
            m = e;
            c = k;
        }
    }
    return m;
});
exports.minBy = minBy;

exports.count = async (iter) => {
    //array, string
    if (iter.length && Number.isInteger(iter.length)) {
        return iter.length;
    }

    //map, set, any collection
    if (iter.size && Number.isInteger(iter.size)) {
        return iter.size;
    }

    //iterators
    if (iter[Symbol.asyncIterator] || iter[Symbol.iterator]) {
        let c = 0;
        for await (const _ of iter) {
            ++c;
        }
        return c;
    }

    //object
    return Object.keys(iter).length;
};

exports.sum = P.foldl1(C.add);
exports.max = maxBy(C.identity);
exports.min = minBy(C.identity);

exports.average = async (iter) => {
    let c = 0;
    let sum = 0;
    for await (const e of iter) {
        ++c;
        sum += e;
    }
    return sum / c;
};

exports.splitBy = C.curry(async function*(f, any) {
    yield* await f(any);
});

exports.errorThen = C.curry(async function*(supply, iter){
    try{
        yield* iter;
    } catch(e) {
        supply = await supply;

        if (supply instanceof Function) {
            supply = await supply(e);
        }

        if(supply && (supply[Symbol.iterator] || supply[Symbol.asyncIterator])) {
            yield* supply;
        }
    }
});

exports.then = C.curry((f, arg) => f(arg));

exports.tap = C.curry(async (f, arg) => {
    await f(arg);
    return arg;
});

exports.buffer = C.curry(async function*(supply, iter) {
    supply = await supply;

    if(supply <= 0) {
        throw new Error("arg supply > 0 required")
    }

    let c = [];
    for await (const e of iter) {
        const len = c.push(e);
        if (len >= supply) {
            yield c;
            c = [];
        }
    }

    if (c.length !== 0) {
        yield c;
    }
});

exports.find = C.curry(async (fn, iter) => {
    for await(const e of iter) {
        if (await fn(e)) {
            return e;
        }
    }
    //return undefined;
});

exports.findLast = C.curry(async (fn, iter) => {
    iter = Array.isArray(iter) ? iter : await collect(iter);
    for (let i = iter.length - 1; i >= 0; --i) {
        if (await fn(iter[i])) {
            return iter[i];
        }
    }
    //return undefined;
});