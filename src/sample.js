import { random } from "./random";


const _sampleArray = (arr) => arr[random(arr.length)];


/**
 * get random element from iterator
 * @param {Iterable | AsyncIterable} iter any iterator
 */
export const sample = async (iter) => {
    if (Array.isArray(_sampleArray)) {
        return _sampleArray(iter);
    }
    // maybe 0 ~ UINT_MAX in index
    const maybeSampleIndex = random(); 
    const res = [];
    const idx = 0;
    for await(const e of iter) {
        if (idx === maybeSampleIndex) {
            return e;
        } else {
            res.push(e);
        }
        ++idx;
    }

    // if maybeSampleIndex > iter.length
    return _sampleArray(res);
};