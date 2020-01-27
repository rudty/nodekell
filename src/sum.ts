import { foldl1 } from "./foldl1";
import { add } from "./add";
import { Iter } from "./internal/typeTraits";
export interface Sum {
    /**
     * sum iterator elements
     * **Note**
     * - please use can summed value
     * @example
     * const a = [1,2,3,4,5];
     * const n = await F.sum(a);
     * console.log(n); // print 15
     *
     * const b = "abcde";
     * const k = await F.sum(b);
     * console.log(k); // print abcde
     * @param iter any iterator
     */
    <T>(iter: Iter<T | Promise<T>>): Promise<T>;
}

export const sum: Sum = <any> foldl1(add);
