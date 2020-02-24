import { curry } from "./curry";
import { ExtractPromise } from "./internal/typeTraits";
export interface MemoizeBy {
    /**
     * result of the call is stored in the internal cache, and the next call returns the result of the cache
     * first argument is the key value to be stored in the internal cache
     * function returns promise
     * **Note**
     * - if use overloaded type function, use generic
     * ```ts
     * const addn = F.memoizeBy<(a: number, b: number) => number>((...e) => e, F.add);
     * addn(1, 2);
     * const adds = F.memoizeBy<(a: string, b: string) => string>((...e) => e, F.add);
     * adds('a', 'b');
     * const add = F.memoizeBy<((a: string, b: string) => string) | ((a: number, b: number) => number)>((...e) => e, F.add);
     * add('a', 'b') as string;
     * add(1, 2) as number;
     * ```
     * @example
     * const memFn = () => {
     *     console.log("callOnce");
     * };
     * const m = F.memoizeBy(F.identity, memFn);
     * await m();
     * await m();
     * await m();
     * // print
     * // callOnce
     * @param keyFn save key function
     * @param callFn get value function
     */
    <P extends any[], R>(keyFn: (...args: P) => any, callFn: (...args: P) => (R | Promise<R>)): (...args: P) => Promise<R>;
    <F extends (...args: any[]) => any>(keyFn: (...args: Parameters<F>) => any, callFn: F): (...args: Parameters<F>) => Promise<ExtractPromise<ReturnType<F>>>;
    <P extends any[], R>(keyFn: (...args: P) => any): (callFn: (...args: P) => (R | Promise<R>)) => (...args: P) => Promise<R>;
    <F extends (...args: any[]) => any>(keyFn: (...args: Parameters<F>) => any): (callFn: F) => (...args: Parameters<F>) => Promise<ExtractPromise<ReturnType<F>>>;
}
export const memoizeBy: MemoizeBy = curry((keyFn: any, callFn: any) => {
    const cache: { [key: string]: any; } = {};
    return async (...arg: any[]) => {
        let r;
        const key = await keyFn(...arg);
        if (!(key in cache)) {
            r = await callFn(...arg);
            cache[key] = r;
        } else {
            r = cache[key];
        }
        return r;
    };
});
