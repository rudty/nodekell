import { _headTail } from "./internal/headTail";
import { equals } from "./equals";
import { curry } from "./curry";

/**
 *  @param {Function} function
 *  @param {Iterable | AsyncIterable} iter 
 *  @example
 *      const a = [1,2,2,3,3,3,4,4,5,5,5,5];
 *      const r = F.distinctUntilChangedBy(F.identity, a);
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      //print
 *      //1
 *      //2
 *      //3
 *      //4
 *      //5
 */
export const distinctUntilChangedBy = curry(async function *(f, iter) {
    let [head, g] = await _headTail(iter);
    yield head;
    head = await f(head);

    for await (const e of g) {
        const v = await f(e);
        if (!equals(head, v)) {
            head = v;
            yield e;
        }
    }
});
