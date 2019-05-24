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


class MemoizeWithTimeout {
    constructor(timeout, callFn) {
        this.cache = {};
        this.callFn = callFn;
        this.timeout = timeout;
    }

    async callValue(now, arg) {
        const ret = await this.callFn(...arg);
        this.cache[arg] = { value: ret, time: now };
        return ret;
    }

    async getOrCall(arg) {
        const now = Date.now();
        const c = this.cache[arg];
        if ((!c) || (now - c.time > this.timeout)) {
            return await this.callValue(now, arg);
        }
        return c.value;
    }
}

exports.memoizeWithTimeout = C.curry((timeout, callFn) => {
    const m = new MemoizeWithTimeout(timeout, callFn);
    return async (...arg) => m.getOrCall(arg);
});