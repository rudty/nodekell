'use strict';
const C = require("./core.js");

exports.repeat = async function* (a, ...b) {
    let supply = a;
    let len = Infinity;
    if (b.length > 0) {
        supply = b[0];
        len = await a;
    }
    supply = await supply;
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield await supply();
        }
    } else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};

exports.range = function* (...k) {
    let begin = 0;
    let end = Infinity;
    let n = 1;
    const len = k.length;

    switch(len) {
    case 1:
        end = k[0];
        break;
    case 2:
        begin = k[0];
        end = k[1];
        break;
    case 3:
        begin = k[0];
        end = k[1];
        n = k[2];
        break;
    }

    for (let i = begin; i !== end; i += n) {
        yield i;
    }
};

exports.iterate = C.curry(async function*(fn, v) {
    v = await v;
    yield v;
    while(true) {
        v = await fn(v);
        yield v;
    }
});

/**
 * like python enumerate
 */
exports.enumerate = async function* (iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};