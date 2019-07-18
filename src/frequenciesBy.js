import { curry } from "./curry";

/**
 * get frequency count by function
 * 
 *  (async () => {
 *      const arr = [{a:1},{a:2},{a:1}];
 *      const f = await frequenciesBy(e => e.a, arr);
 *      console.log(f);
 *  })();
 * 
 * //count by elem.a
 * //print Map { 1 => 2, 2 => 1 }
 * 
 * @param {Function} fn frequency_function
 * @param {Iterable | AsyncIterable} iter any iterable
 * @return {Promise<Map>} frequencyMap
 */
export const frequenciesBy = curry(async (fn, iter) => {
    const m = new Map();

    for await (const v of iter) {
        const e = await fn(v);
        const cnt = (m.get(e) || 0) + 1;
        m.set(e, cnt);
    }

    return m;
});