'use strict';
const C = require("./core.js");

/**
 * if (F.otherwise) {
 *  // work
 * }
 * 
 * if (F.otherwise()) {
 *  // work
 * }
 */
exports.otherwise = () => true;

const mustEvenArguments = (arr) => {
    if ((arr.length) & 1) {
        throw new Error("requires an even arguments");
    }
};

exports.cond = async (...cv) => {
    mustEvenArguments(cv);

    for (let i = 0; i < cv.length; i += 2) {

        if (await cv[i]) {
            return cv[i + 1];
        }
    }
    // return undefined
};

const memoizeBy = C.curry((keyFn, callFn) => {
    const cache = {};
    return async (...arg) => {
        let r;
        const key = keyFn(...arg);
        if(!(key in cache)) {
            r = await callFn(...arg);
            cache[key] = r;
        } else {
            r = cache[key];
        }
        return r;
    };
});
exports.memoizeBy = memoizeBy;

exports.memoize = memoizeBy((...a) => a);

exports.memoizeWithTimeout = C.curry((timeout, callFn) => {
    const cache = {};
    return async (...arg) => {
        const now = Date.now();
        let r;
        if (!(arg in cache)) {
            r = await callFn(...arg);
            cache[arg] = { value: r, time: now };
        } else {
            r = cache[arg];
            if (now - r.time > timeout) {
                r = await callFn(...arg);
                cache[arg] = { value: r, time: now };
            }
        }
        
        return r.value;
    };
});