import { _headTailNoThrow } from "./internal/headTail";
import { curry } from "./curry";
import { groupBy } from "./groupBy";

/**
 * get frequency
 * 
 * @param {Function} keyFn compare, element => key function
 * @param {Iterable | AsyncIterable} iter
 */
export const leastFrequencyBy = curry(async (keyFn, iter) => {
    const groups = await groupBy(keyFn, iter);
    let minValue;
    let minCount = Infinity;
    for (const value of groups.values()) {
        const len = value.length;
        if (len < minCount) {
            minCount = len;
            minValue = value[0];
        }
    }
    return minValue;
});