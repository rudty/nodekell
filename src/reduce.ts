import { foldl1 } from "./foldl1";

/**
 * same as fold1
 * take 1 items and call foldl
 *
 * @example
 * const a = [1,2,3,4,5];
 * const sum = await F.reduce((acc, e) => acc + e, a);
 * console.log(sum); // print 15;
 *
 * @param f (acc: T, elem: T) => (T | Promise<T>)
 * @param iter any iterator
 */
export const reduce = foldl1;
