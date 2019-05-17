'use strict';
/**
 * currying function wrapper
 * ex)
 * var mySum = curry((a,b,c) => {return a+b+c;});
 *
 * var mySum1 = mySum(1)
 * var mySum2 = mySum1(2)
 * var sum = mySum2(3) // <-- real call
 */
const curry = fn => (...a) => {
    if (fn.length <= a.length) {
        return fn(...a);
    } else {
        return (...b) => curry(fn)(...a, ...b);
    }
};
exports.curry = curry;

/**
 * make generator
 * do not need to check if iter
 * Symbol.asyncIterator or Symbol.iterator
 */
exports.seq = async function* (iter) {
    for await (const e of iter) {
        yield e;
    }
};

exports.add = curry((a, b) => a + b);
exports.sub = curry((a, b) => a - b);
exports.inc = a => a + 1;
exports.dec = a => a - 1;
exports.first = a => a[0];
exports.second = a => a[1];

exports.identity = e => e;
exports.fnothing = () => {};

const isNil = v => {
    if (v) {
        return false;
    }

    switch(v){
        case null: return true;
        case undefined: return true;
        default: return Number.isNaN(v);
    }
};

exports.isNil = isNil;

//deprecated / use isNill instead.
exports.notNil = (a) => !isNil(a);

/**
 * support Map, Set, any Object
 */
const get = curry((key, a) => {
    if (a.get && a.get.constructor === Function) {
        const r = a.get(key);
        if (r !== undefined) {
            return r;
        }
    }
    return a[key];
});

exports.get = get;

exports.has = curry((key, a) => {
    if (a[key]) {
        return true;
    }
    return (key in a);
});

exports.prop = curry((key, a) => a[key]);





/**
 * concept 
 * 
 * like python enumerate
 * ar = [9,8,7]
 * for await (const [i, e] of F.enumerate(ar)) {
 *      i = 0, 1, 2 ...
 *      e = 9, 8, 7 ..
 * }
 */
exports.enumerate = async function* (iter) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};

/**
 * 
 * concpet
 * boost :: combine
 * 
 * a1 = [1,2,3]
 * a2 = ["a","b","c","d","e"]
 * a3 = [7,8,9,10,11]
 * for await (const [a, b, c] of F.???(a1,a2,a3)) {
 *      a = 1,2,3
 *      b = "a","b","c"
 *      c = 7,8,9
 * }
 */
// exports.???