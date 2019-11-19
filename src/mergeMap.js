import { curry } from "./curry";
import { run } from "./run";
import { _toIterator } from "./internal/iterable";
import { map } from "./map";
import { flat } from "./flat";
import { collectMap } from "./collectMap";

/**
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @example
 *      const m1 = new Map([[1, 2], [3, 4]]);
 *      const m2 = new Map([[5, 6], [7, 8]]);
 *      const r1 = await F.mergeMap(m1, m2);
 *      console.log(r1); // print Map { 1 => 2, 3 => 4, 5 => 6, 7 => 8 }
 *
 *      const m3 = new Map([[1, 2], [3, 4]]);
 *      const o1 = { 5: 6, 7: 8 };
 *      const r2 = await F.mergeMap(m3, o1);
 *      console.log(r2); // print Map { 1 => 2, 3 => 4, '5' => 6, '7' => 8 }
 *
 * @param {Iterable | AsyncIterable | Object} source1 source Map or Object from which to copy properties
 * @param {Iterable | AsyncIterable | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Iterable | AsyncIterable | Object)[]} sources 
 * @returns {Promise<Map>}
 */
export const mergeMap = curry(async (source1, source2, ...sources) => 
    await run([source1, source2, ...sources], 
        map(_toIterator),
        flat,
        collectMap));
