import { memoizeBy } from "./memoizeBy";
import { ExtractPromise } from "./internal/typeTraits";
export interface MemoizeType {
    /**
     * result of the call is stored in the internal cache, and the next call returns the result of the cache
     * function returns promise
     * **Note**
     * - if use overloaded type function, use generic
     * ```ts
     * const addn = F.memoize<(a: number, b: number) => number>(F.add);
     * addn(1, 2);
     * const adds = F.memoize<(a: string, b: string) => string>(F.add);
     * adds('a', 'b');
     * const add = F.memoize<((a: string, b: string) => string) | ((a: number, b: number) => number)>(F.add);
     * add('a', 'b') as string;
     * add(1, 2) as number;
     * ```
     * @example
     * const memFn = () => {
     *     console.log("callOnce");
     * };
     * const m = F.memoize(memFn);
     * await m();
     * await m();
     * await m();
     * // print
     * // callOnce
     * @param callFn any memoize function
     */
    <P extends any[], R>(callFn: (...args: P) => R): (...args: P) => Promise<ExtractPromise<R>>;
    <F extends (...args: any[]) => any>(callFn: F): (...args: Parameters<F>) => Promise<ExtractPromise<ReturnType<F>>>;
}
export const memoize: MemoizeType = memoizeBy((...a) => a);
