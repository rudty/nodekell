import { identity } from "./identity";
import { maxBy } from "./maxBy";
import { Iter } from "./internal/typeTraits";
export interface MaxType {
    /**
     * Gets the max value in the range
     *
     * @example
     * await F.max([1,2,3,4,5]);
     * // result: 5
     * @param iter any comparable iterators
     */
    <T>(iter: Iter<T | Promise<T>>): Promise<T>;
}

export const max: MaxType = maxBy(identity);
