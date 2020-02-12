import { identity } from "./identity";
import { minBy } from "./minBy";
import { Iter } from "./internal/typeTraits";
export interface MinType {
    /**
     * Gets the min value in the range
     *
     * @example
     * await F.min([1,2,3,4,5,0]);
     * // result: 0
     * @param iter any comparable iterators
     */
    <T>(iter: Iter<T | Promise<T>>): Promise<T>;
}

export const min: MinType = minBy(identity);
