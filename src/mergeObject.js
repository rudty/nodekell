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
 * @param {Map | Object} source1 source Map or Object from which to copy properties
 * @param {Map | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Map | Object)} sources 
 * @returns {Object}
 */
export const mergeObject = curry(async (source1, source2, ...sources) =>
    await run([source1, source2, ...sources], 
        map(_toIterator),
        flat,
        collectObject));

