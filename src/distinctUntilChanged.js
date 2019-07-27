import { distinctUntilChangedBy } from "./distinctUntilChangedBy";
import { identity } from "./identity";

/**
 *  @param {Iterable | AsyncIterable} iter 
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
 */
export const distinctUntilChanged = distinctUntilChangedBy(identity);
