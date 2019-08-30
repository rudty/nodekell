import { curry } from "./curry";
import { mergeObject } from "./mergeObject";
/**
 * Create a new object by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @param {Iterable | AsyncIterable | Object} source1 source Map or Object from which to copy properties
 * @param {Iterable | AsyncIterable | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Iterable | AsyncIterable | Object)[]} sources 
 * @returns {Promise<Object>}
 */
export const mergeObjectRight = curry((source1, source2, ...sources) => 
    mergeObject.apply(null, [source1, source2, ...sources].reverse()));
