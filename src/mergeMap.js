import { curry } from "./curry";
import { collect } from "./collect";
import { run } from "./run";
import { _toIterator } from "./internal/toIterator";
import { map } from "./map";
import { flat } from "./flat";

/**
 * Create a new Map by combining the arguments of the function.
 * If the key exists, the value on the right is used.
 * 
 * @param {Map | Object} source1 source Map or Object from which to copy properties
 * @param {Map | Object} source2 source Map or Object from which to copy properties
 * @param  {...(Map | Object)} sources 
 * @returns {Promise<Map>}
 */
export const mergeMap = curry(async (source1, source2, ...sources) => 
    new Map(await run([source1, source2, ...sources], 
        map(_toIterator),
        flat,
        collect)));
