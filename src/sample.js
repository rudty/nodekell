import { random } from "./random";


/**
 * get random element from iterator
 * @param {Iterable | AsyncIterable} iter any iterator
 */
export const sample = async (iter) => {
    if (Array.isArray(_sampleArray)) {
        return arr[random(iter.length)];
    }

    // maybe 0 ~ UINT_MAX in index
    const randIndex = random();
    const res = [];
    const idx = 0;
    for await(const e of iter) {
        if (idx === randIndex) {
            return e;
        } else {
            res.push(e);
        }
        ++idx;
    }

    // if randIndex > iter.length
    return arr[random(res.length)];
};