import { _isArrayLike } from "./internal/typeTraits";
import { _toIterator } from "./internal/toIterator";

/**
 * Gets only the Key value from the Collection object.
 * When an Iterable object traverses into an Array, returns an asynciterator that traverses only the first element.
 * @example
 *      const m = new Map([["a", 1], ["b", 2]]);
 *      for await(const k of F.keys(m)) {
 *          console.log(k);
 *      }
 *      // print "a", "b"
 *
 *      const a = async function *() { 
 *          yield [1, 2]; 
 *          yield [3, 4]; 
 *          yield [5, 6]; 
 *      }; 
 *
 *      for await (const e of F.keys(a())) { 
 *          console.log(e);
 *      }
 *      // print [1, 3, 5]s
 */
export const keys = async function *(iter) {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[0];
        } else {
            // yield e;
            throw new Error(`keys / ${e} is not array`);
        }
    }
};