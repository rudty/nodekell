import { random } from "./random";

const _sampleArray = (arr) => arr[random(arr.length)];
/**
 * get random element from iterator
 * @param {Iterable | AsyncIterable} iter any iterator
 */
export const sample = async (iter) => {
    if (Array.isArray(iter)) {
        return _sampleArray(iter);
    }

    // maybe 0 ~ UINT_MAX in index
    const randIndex = random();
    const res = [];
    let idx = 0;
    for await(const e of iter) {
        if (idx === randIndex) {
            return e;
        } else {
            res.push(e);
        }
        ++idx;
    }

    // if randIndex > iter.length
    return _sampleArray(res);
};