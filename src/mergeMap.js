import { curry } from "./curry";
import { run } from "./run";
import { _toIterator } from "./internal/toIterator";
import { map } from "./map";
import { flat } from "./flat";
import { collectMap } from "./collectMap";

/**
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
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
