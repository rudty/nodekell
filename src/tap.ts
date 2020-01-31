import { curry } from "./curry";
import { ExtractPromise } from "./internal/typeTraits";
export interface Tap {
    /**
     * call first argument with second argument
     * then returns the second argument
     * return promise wrap
     * @example
     * const v = await F.run([1,2,3,4,5],
     *  F.tap(console.log), //print and return Promise([1,2,3,4,5])
     *  F.map(e => e + 1),
     *  F.collect);
     * @param f call function
     * @param t any value
     */
    <T>(f: (t: T) => any, t: T): Promise<ExtractPromise<T>>;
    <T>(f: (t: T) => any): (t: T) => Promise<ExtractPromise<T>>;
}

export const tap: Tap = curry(async (f: any, arg: any): Promise<any> => {
    await f(arg);
    return arg;
});
