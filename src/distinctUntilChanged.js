import { distinctUntilChangedBy } from "./distinctUntilChangedBy";
import { identity } from "./identity";

/**
 *  @example
 *      const a = [1,2,2,3,3,3,4,4,5,5,5,5];
 *      const r = F.distinctUntilChanged(a);
 *      for await (const e of r) {
 *          console.log(e);
 *      }
 *      //print
 *      //1
 *      //2
 *      //3
 *      //4
 *      //5
 * @param {Iterable | AsyncIterable} iter
 */
export const distinctUntilChanged = distinctUntilChangedBy(identity);
