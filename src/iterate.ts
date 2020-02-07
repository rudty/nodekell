import { curry } from "./curry";
import { _Func1 } from "./internal/typeTraits";

export interface Iterate {
    /**
     * apply a function to an argument to produce a sequence
     * @example
     * const fibo = (a) => [a[1], a[0] + a[1]];
     * const r = await F.run(
     *     F.iterate(fibo, [0, 1]),//[0, 1], [1, 1], [1, 2], [2, 3] ...
     *     F.map(F.head),//[0,1,1,2 ...
     *     F.take(10),//[0,1,1,2,3,5,8,13,21,34]
     *     F.collect);//generator to array
     * console.log(r);
     * // print
     * // [0,1,1,2,3,5,8,13,21,34]
     * @param f apply function
     * @param value init value
     */
    <T>(f: _Func1<T, T>, value: T | Promise<T>): AsyncIterableIterator<T>;
    <T>(f: _Func1<T, T>): (value: T | Promise<T>) => AsyncIterableIterator<T>;
}

export const iterate: Iterate = curry(async function *(fn: _Func1<any, any>, v: any): AsyncIterableIterator<any> {
    v = await v;
    yield v;
    while (true) {
        v = await fn(v);
        yield v;
    }
});
