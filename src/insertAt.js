import { _flatOnce } from "./internal/iterable";
import { curry } from "./curry";

/**
 * Add {iter} to the {index} position of {iter} received as an argument. 
 * If {index} is greater than the length of {iter}, it is added to the end of {iter}.
 * @param {any} value add value
 * @param {Number} index add index
 * @param {Iterable | AsyncIterable} iter any iterable
 * @returns {AsyncIterable}
 */
export const insertAt = curry(async function *(value, index, iter) {
    let i = 0;
    for await(const e of iter) {
        if (i++ === index) {
            yield* _flatOnce(value);
        }
        yield e;
    }

    if (i <= index) {
        yield* _flatOnce(value); 
    }
});