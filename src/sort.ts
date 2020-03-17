import { sortBy, SortByType } from "./sortBy";
import { asc } from "./asc";
import { Iter, ExtractPromise } from "./internal/typeTraits";
/**
 * Sort the values in ascending order.
 */
export interface SortType {
    <T>(iter: Iter<T | Promise<T>>): Promise<ArrayLike<ExtractPromise<T>>>;
}

export const sort: SortByType = <any> sortBy(asc);
