import { curry } from "./curry";
import { mergeObject } from "./mergeObject";
/**
 * Create a new object by combining the arguments of the function.
 * If the key exists, the value on the left is used.
 *
 * @example
 *      const m1 = new Map([[1, 2], [3, 4]]);
 *      const o1 = { 5: 6, 7: 8 };
 *      const r1 = await F.mergeObjectRight(m1, o1);
 *      console.log(r1); // print { '1': 2, '3': 4, '5': 6, '7': 8 }
 *
 * @param {Iterable | AsyncIterable | Object} source1 source Map or Object from which to copy properties
 * @param {Iterable | AsyncIterable | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Iterable | AsyncIterable | Object)[]} sources 
 * @returns {Promise<Object>}
 */
export const mergeObjectRight = curry((source1, source2, ...sources) => 
    mergeObject.apply(null, [source1, source2, ...sources].reverse()));
