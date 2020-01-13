import { Iter, ExtractPromise } from "./internal/typeTraits";

export interface Collect {
    <T>(iter: Iter<T>): Promise<ExtractPromise<T>[]>;
}
/**
 * iterable to array
 * and resolve promise elements
 *
 * @example
 * const mapped = F.map(e => e + 1, a);
 * console.log(mapped); // print asyncGenerator
 * const collected = await F.collect(mapped);
 * console.log(collected); //print [2,3,4,5,6]
 *
 * const v = await F.run(
 *   F.range(Infinity),//[0,1,2....]
 *   F.filter(e => (e % 3) === 0), //[0,3,6...]
 *   F.map(e => e + 1), //[1,4,7...]
 *   F.take(5), // generator([1,4,7,10,13])
 *   F.collect);  // generator => array
 * console.log(v); //[1,4,7,10,13]
 *
 * @param iter any iterable
 */
export const collect: Collect = async (iter: Iter<any>): Promise<any[]> => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};
