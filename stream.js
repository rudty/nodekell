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

const count = async (iter) => {
    let c = 0;
    for await (const e of iter) {
        c += 1;
    }
    return c;
};

const forEach = P.curry(async (f, iter) => {
    let wait = [];
    for await (const e of iter) {
        const r = f(e);
        if (r) {
            wait.push(r);
        }
    } 
    return Promise.all(wait);
});

const sleep = (t) => new Promise(r => {
    setTimeout(()=> r(), t);
});

module.exports = {
    firstOrGet: firstOrGet,
    collect: collect,
    collectMap: collectMap,
    count: count,
    forEach: forEach,
    sleep: sleep
};