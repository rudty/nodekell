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

const memoizeWith = C.curry((keyFn, callFn) => {
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
exports.memoizeWith = memoizeWith;

exports.memoize = memoizeWith((...a) => a);
// exports.memoizeWithExpireTime;