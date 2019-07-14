import { curry } from "./curry";

/**
 * get frequency
 * 
 * @param {Function} keyFn compare, element => key function
 * @param {Iterable | AsyncIterable} iter
 */
export const mostFrequencyBy = curry(async (keyFn, iter) => {

    let mostValue;
    let mostCount = 0;

    const m = new Map();

    for await (const e of iter) {
        const v = await keyFn(e);
        const f = (m.get(v) || 0) + 1;
        m.set(v, f);
        if (mostCount < f) {
            mostCount = f;
            mostValue = e;
        }
    }

    return mostValue;
});