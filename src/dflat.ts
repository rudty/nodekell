import { _isString, _hasIterator, Iter, ExtractPromise, Flat } from "./internal/typeTraits";
/**
 * Non-Promise Iter Deep Flat
 */
export type DFlatResult<T> =
    T extends Iter<infer E0> ?
    E0 extends Iter<infer E1> ?
    E1 extends Iter<infer E2> ?
    E2 extends Iter<infer E3> ?
    E3 extends Iter<infer E4> ?
    E4 extends Iter<infer E5> ?
    E5 extends Iter<infer E6> ?
    E6 extends Iter<infer E7> ?
    E7 extends Iter<infer E8> ?
    E8 extends Iter<infer E9> ?
    E9 extends Iter<infer E10> ?
    E10 extends Iter<infer E11> ?
    E11 : // 12
    E10 :
    E9 :
    E8 :
    E7 :
    E6 :
    E5 :
    E4 :
    E3 :
    E2 :
    E1 :
    E0 :
    T;

/**
 * Promise Iter Deep Flat
 */
export type PDFlat<T> =
    ExtractPromise<DFlatResult<
    ExtractPromise<DFlatResult<
    ExtractPromise<DFlatResult<
    ExtractPromise<DFlatResult<
    ExtractPromise<DFlatResult<
    ExtractPromise<DFlatResult<
    ExtractPromise<DFlatResult< // 7
    ExtractPromise<T>>>>>>>>>>>>>>>;

export interface Dflat {
    /**
     * Similar to flat, but works recursively
     * **Note**
     * - don't use too deep iter
     * @example
     * const r = F.dflat([[[1],[2]]],[[3]],[4]);
     * const c = await F.collect(r);
     * console.log(c);//print [1,2,3,4]
     * @param a iterators
     */
    <T extends any[]>(...a: T): AsyncIterableIterator<PDFlat<Flat<T>>>;
}

export const dflat: Dflat = async function *(...iters: any): AsyncIterableIterator<any> {
    for await (const it of iters) {
        if (it) {
            if (_isString(it)) {
                yield* it;
                continue;
            } else if (_hasIterator(it)) {
                for await (const e of it) {
                    yield* dflat(e);
                }
                continue;
            }
        }
        yield it;
    }
};
