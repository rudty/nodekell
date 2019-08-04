import { _isReadableArrayLike } from "./internal/typeTraits";
import { curry } from "./curry";

/**
 * returns a Map using iterator.
 * when the function returns Array
 * it uses the first argument as key and the second argument as value.
 * when not in an array, the key and value are both return values.
 * 
 * @example
 *      const arr0 = [1, 2, 3];
 *      const m0 = await F.associateBy(e => [e, e * 2], arr0); 
 *      console.log(m0);
 *      // => Map { 1 => 2, 2 => 4, 3 => 6 }
 *      
 *      const arr1 = [1, 2, 3];
 *      const m1 = await F.associateBy(e => e + 1, arr1);
 *      console.log(m1);
 *      // => Map { 2 => 2, 3 => 3, 4 => 4 }
 * 
 * @param {Function} fn convert function
 * @param {Iterable | AsyncIterable} iter any iterator
 * @returns {Map} convert Map
 */
export const associateBy = curry(async (fn, iter) => {
    const m = new Map();
    for await (const e of iter) {
        const v = await fn(e);
        if (_isReadableArrayLike(v)) {
            m.set(v[0], v[1]);
        } else {
            m.set(v, v);
        }
    }
    return m;
});
