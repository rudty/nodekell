import { curry } from "./curry";
import { _collectArray } from "./internal/collectArray";
import { seq } from "./seq";
import { _takeValue } from "./internal/runtime";

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
    const g = seq(iter);
    for await (const e of g) {
        if (i++ === index) {
            yield value;
            yield* g;
            return;
        } else {
            yield e;
        }
    }
});
