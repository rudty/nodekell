import { curry } from "./curry";
import { foldl } from "./foldl";
import { forEachIndexed } from "./forEachIndexed";
import { seq } from "./seq";
import { _collectArray } from "./internal/collectArray";
import { Iter, FlatAccumulator } from "./internal/typeTraits";

export interface JuxtA {
    /**
     * Run multiple foldl
     * @example
     * const a = await F.juxtA([Math.max, Math.min], [1,2,3,4,5]);
     * console.log(a);
     * // print [5,1]
     * @param fn reduce function
     * @param iter any iterator
     */
    <T extends Iter<any>, F extends FlatAccumulator<T>>(fn: Iter<F>, iter: T): Promise<ReturnType<F>[]>;
    <T extends Iter<any>, F extends FlatAccumulator<T>>(fn: Iter<F>): (iter: T) => Promise<ReturnType<F>[]>;
}

export const juxtA: JuxtA = curry(async (af: any, iter: any) => {
    af = await <any> (_collectArray(af));

    const len = af.length;
    const g = seq(iter);
    const r: any = [];
    r.length = len;

    const firstElem = await g.next();
    if (firstElem.done) {
       // empty [undefined, undefined]
       return r;
    }

    r.fill(firstElem.value);

    //   same
    //   foldl(async (acc, e) => {
    //     for (let i = 0; i < len; ++i) {
    //         acc[i] = af[i](acc[i], e);
    //         return Promise.all(acc);
    //     }
    //  }, r, g);
    return foldl((acc, e) => forEachIndexed((i, x) => af[i](x, e), acc), r, g);
});
