import { curry } from "./curry";
import { run } from "./run";
import { _toIterator } from "./internal/toIterator";
import { map } from "./map";
import { flat } from "./flat";
import { collectObject } from "./collectObject";
/**
 * Create a new object by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 *
 * @example
 *      const m1 = new Map([[1, 2], [3, 4]]);
 *      const o1 = { 5: 6, 7: 8 };
 *      const r1 = await F.mergeObject(m1, o1);
 *      console.log(r1); // print { '1': 2, '3': 4, '5': 6, '7': 8 }
 *
 * @param {Iterable | AsyncIterable | Object} source1 source Map or Object from which to copy properties
 * @param {Iterable | AsyncIterable | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Iterable | AsyncIterable | Object)[]} sources 
 * @returns {Promise<Object>}
 */
export const mergeObject = curry(async (source1, source2, ...sources) =>
    await run([source1, source2, ...sources], 
        map(_toIterator),
        flat,
        collectObject));

