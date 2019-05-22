'use strict';

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

exports.memoize = (fn) => {
    const cache = new Map();
    return (...arg) => {
        let r = cache.get(arg);
        if(r === undefined) {
            r = fn(...arg);
            cache[arg] = r;
        }
        return r;
    };
};

// exports.memoizeWith;

// exports.memoizeWithExpireTime;