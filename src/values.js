import { _isArrayLike } from "./internal/typeTraits";
import { _toIterator } from "./internal/toIterator";

/**
 * Gets only the Value from the Collection object.
 * When an Iterable object traverses into an Array, returns an asynciterator that traverses only the second element.
 * @example
 *      const m = new Map([["a", 1], ["b", 2]]);
 *      for await(const k of F.values(m)) {
 *          console.log(k);
 *      }
 *      // print 
 *      // 1
 *      // 2
 *
 *      const a = async function *() { 
 *          yield [1, 2]; 
 *          yield [3, 4]; 
 *          yield [5, 6]; 
 *      }; 
 *
 *      for await (const e of F.values(a())) { 
 *          console.log(e);
 *      }
 *      // print 
 *      // 2
 *      // 4 
 *      // 6
 */
export const values = async function *(iter) {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[1];
        } else {
            // yield e;
            throw new Error(`values / ${e} is not array`);
        }
    }
};