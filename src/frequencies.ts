import { identity } from "./identity";
import { frequenciesBy } from "./frequenciesBy";
import { Iter, FlatForInternalFn } from "./internal/typeTraits";

export interface FrequenciesType {
    /**
     * returns a Map. keys are the items that remove duplicates value is the number of times key
     * @example
     * const arr = [1,1,2,3,4,5,5];
     * const r = await F.frequencies(arr);
     * console.log(r);
     * // print
     * // Map { 1 => 2, 2 => 1, 3 => 1, 4 => 1, 5 => 2 }
     * @param iter any iterator
     */
    <T extends Iter<any>>(iter: T): Promise<Map<FlatForInternalFn<T>, number>>;
}

export const frequencies: FrequenciesType = frequenciesBy(identity);
