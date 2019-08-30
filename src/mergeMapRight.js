import { curry } from "./curry";
import { mergeMap } from "./mergeMap";


/**
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @param {Iterable | AsyncIterable | Object} source1 source Map or Object from which to copy properties
 * @param {Iterable | AsyncIterable | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Iterable | AsyncIterable | Object)[]} sources 
 * @returns {Promise<Map>}
 */
export const mergeMapRight = curry((source1, source2, ...sources) =>
    mergeMap.apply(null, [source1, source2, ...sources].reverse()));
