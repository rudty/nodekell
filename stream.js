'use strict';
const P = require("./prelude");

const firstOrGet = P.curry(async (supply, iter) => {
    for await (const e of iter) {
        return e;
    }
    supply = await supply;
    if (supply instanceof Function) {
        return await supply();
    }
    return supply;
});


const emptyThen = P.curry(async function*(supply, iter) {
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

const collectMap = async (iter) => {
    return new Map(await collect(iter));
};

const collectSet = async (iter) => {
    return new Set(await collect(iter));
}

const sum = (iter) => P.foldl1((acc, e) => acc + e, iter);

const count = async (iter) => {
    let c = 0;
    for await (const _ of iter) {
        c += 1;
    }
    return c;
};

const forEach = P.curry(async (f, iter) => {
    const wait = [];
    for await (const e of iter) {
        const r = f(e);
        if (r) {
            wait.push(r);
        }
    } 
    return Promise.all(wait);
});

const distinctBy = P.curry(async function*(f, iter) {
    const s = new Set();
    for await (const e of iter) {
        const d = await f(e);
        if (!s.has(d)) {
            s.add(d);
            yield e;
        }
    }
});

const distinct = P.curry((iter) => distinctBy(e => e, iter));


const some = P.curry(async (f, iter) => {
    for await (const e of iter) {
        if (await f(e)) {
            return true;
        }
    }
    return false;
});

const every = P.curry(async (f, iter) => {
    for await (const e of iter) {
        if (!(await f(e))) {
            return false;
        }
    }
    return true;
});

const maxBy = P.curry(async (f, iter) => {
    let m = await P.head(iter);
    let c = await f(m);
    for await (const e of iter) {
        const g = await f(e);
        if (g > c) {
            m = e;
            c = g;
        }
    }
    return m;
});

const minBy = P.curry(async (f, iter) => {
    let m = await P.head(iter);
    let c = await f(m);
    for await (const e of iter) {
        const g = await f(e);
        if (g < c) {
            m = e;
            c = g;
        }
    }
    return m;
});

const splitBy = P.curry(async function*(f, any) {
    yield* await f(any);
});

const sleep = (t) => new Promise(r => {
    setTimeout(()=> r(), t);
});

module.exports = {
    firstOrGet: firstOrGet,
    collect: collect,
    collectMap: collectMap,
    collectSet: collectSet,
    count: count,
    sum: sum,
    emptyThen: emptyThen,
    forEach: forEach,
    sleep: sleep,
    distinct: distinct,
    distinctBy: distinctBy,
    some: some,
    every: every,
    maxBy: maxBy,
    minBy: minBy,
    splitBy: splitBy
};