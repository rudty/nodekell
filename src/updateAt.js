import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";

/**
 * Update {iter} to the {index} position of {iter} received as an argument. 
 *
 * @param {any} value add value
 * @param {Number} index add index
 * @param {Iterable | AsyncIterable} iter any iterable
 * @returns {AsyncIterable}
 */
export const updateAt = curry(async function *(value, index, iter) {
    let i = 0;
    for await (const e of iter) {
        if (i++ === index) {
            yield value;
        } else {
            yield e;
        }
    }
});
