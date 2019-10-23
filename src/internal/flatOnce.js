import { _hasIterator } from "./typeTraits";

/**
 * If the argument is iterable, the elements are returned as iterable.
 * If not, return the argument iterable
 * @param {*} a 
 * @returns {AsyncIterator}
 */
export const flatOnce = async function *(a) {
    a = await a;
    if (a && _hasIterator(a)) {
        yield* a;
    } else {
        yield a;
    }
};