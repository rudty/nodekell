'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * currying function wrapper
 *
 * @example
 *      var mySum = curry((a, b, c) => {
 *          return a + b + c;
 *      });
 *
 *      var mySum1 = mySum(1)
 *      var mySum2 = mySum1(2)
 *      var sum = mySum2(3) // <-- real call
 *
 * @param f currying function
 * @returns currying function or function call result
 */
const curry = (fn) => (...a) => {
    if (fn.length <= a.length) {
        return fn(...a);
    }
    else {
        return (...b) => curry(fn)(...a, ...b);
    }
};

const filter = curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (await fn(e)) {
            yield e;
        }
    }
});

const filterIndexed = curry(async function* (fn, iter) {
    let i = 0;
    for await (const e of iter) {
        if (await fn(i++, e)) {
            yield e;
        }
    }
});

const filterNot = curry(async function* (fn, iter) {
    for await (const e of iter) {
        if (!(await fn(e))) {
            yield e;
        }
    }
});

/**
 * Call function for all the elements in an iterator
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = foldl((acc, e) => acc + e, 0, a);
 * console.log(sum); // print 15
 *
 * @param f (acc: T1, elem: T2) => (T1 | Promise<T1>)
 * @param z initial value
 * @param iter any iterable
 */
const foldl = curry(async (f, z, iter) => {
    z = await z;
    for await (const e of iter) {
        z = await f(z, e);
    }
    return z;
});

const map = curry(async function* (fn, iter) {
    for await (const e of iter) {
        yield fn(e);
    }
});

/**
 * combination left to right functions
 * first arguments received second functions argument
 * from second received combine functions
 * returns promise
 *
 * **Note**
 * - originally allow Promise wrapped functions. but that is complicated. so don't support Promise wrapped functions type.
 * - please use functions length 20 or less
 *
 * @example
 * let a = [1,2,3,4,5];
 * let r = await F.run(a,
 *          F.map(e => e + 1), // a = [2,3,4,5,6]
 *          F.filter(e => e < 4), // a = [2,3]
 *          F.take(Infinity),
 *          F.collect);
 * console.log(r); // print [2,3]
 *
 * @param iter any iterator
 * @param f combination functions
 */
const run = (iter, ...f) => foldl((z, fn) => fn(z), iter, f);

const _seq = async function* (iter) {
    for await (const e of iter) {
        yield e;
    }
};
/**
 * make iterable(array, set, map, any iteratorable object) to asyncIterator
 * @example
 * const a = [1,2,3,4,5];
 * for await(const e of F.seq(a)) {
 *     console.log(e);
 * }
 * @params iter any iterator
 * @returns async iterator
 */
const seq = (iter) => {
    const it = iter[Symbol.asyncIterator];
    if (it) {
        return it.call(iter);
    }
    return _seq(iter);
};

exports.curry = curry;
exports.filter = filter;
exports.filterIndexed = filterIndexed;
exports.filterNot = filterNot;
exports.foldl = foldl;
exports.map = map;
exports.run = run;
exports.seq = seq;
