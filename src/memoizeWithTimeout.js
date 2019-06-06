import { curry } from "./curry"

const memoizeWithTimeoutBy = (timeout, keyFn, callFn) => {
    const cache = {};
    return async (...arg) => {
        const now = Date.now();
        const key = await keyFn(...arg);
        const c = cache[key];
        if ((!c) || (now - c.time > timeout)) {
            const ret = await callFn(...arg);
            cache[arg] = { value: ret, time: now };
            return ret;
        }
        return c.value;
    }
};

exports.memoizeWithTimeout = curry((timeout, callFn) => memoizeWithTimeoutBy(timeout, (...a) => a, callFn));