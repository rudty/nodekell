import { curry } from "./curry";
import { mergeMap } from "./mergeMap";


/**
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @example
 *      const m1 = new Map([[1, 2], [3, 4]]);
 *      const m2 = new Map([[5, 6], [7, 8]]);
 *      const r1 = await F.mergeMapRight(m1, m2);
 *      console.log(r1); // print Map { 5 => 6, 7 => 8, 1 => 2, 3 => 4 }
 *
 *      const m2 = new Map([[1, 2], [3, 4]]);
 *      const o2 = { 5: 6, 7: 8 };
 *      const r2 = await F.mergeMapRight(m2, o2);
 *      console.log(r2); // Map { '5' => 6, '7' => 8, 1 => 2, 3 => 4 }
 *
 * @param {Iterable | AsyncIterable | Object} source1 source Map or Object from which to copy properties
 * @param {Iterable | AsyncIterable | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Iterable | AsyncIterable | Object)[]} sources 
 * @returns {Promise<Map>}
 */
export const mergeMapRight = curry((source1, source2, ...sources) =>
    mergeMap.apply(null, [source1, source2, ...sources].reverse()));
