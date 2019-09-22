import { sortBy } from "./sortBy";
import { asc } from "./asc";

/**
 * Sort the values in ascending order.
 * iterator or asyncIterator take all the values and sorts them.
 * @param {Iterable | AsyncIterable} iter any iterable
 * @returns {ArrayLike} new sorted array
 */
export const sort = sortBy(asc);
