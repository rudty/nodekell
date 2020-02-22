import { curry } from "./curry";
import { Iter } from "./internal/typeTraits";
export interface SplitByType {
    /**
     * split iter
     * @example
     * const helloWorld = "hello world";
     * const r = await F.splitBy(e=>e.split(" "), helloWorld);
     * for await(const e of r) {
     *     console.log(e);
     * }
     * // print
     * // hello
     * // world
     * @param f split function
     * @param v any value
     */
    <T, R>(f: (t: T) => (Iter<R> | Promise<Iter<R>>), v: T): AsyncIterableIterator<R>;
    // <T, R extends Iter<any>>(f: (t: T) => (R | Promise<R>)): (any: T) => AsyncIterableIterator<FlatForInternalFn<R>>;
    <T, R>(f: (t: T) => (Iter<R> | Promise<Iter<R>>)): (v: T) => AsyncIterableIterator<R>;
}

export const splitBy: SplitByType = curry(async function *(f: any, v: any) {
    yield* await f(v);
});
