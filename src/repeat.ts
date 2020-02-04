import { ExtractPromise } from "./internal/typeTraits";

export interface Repeat {
    /**
     * https://github.com/rudty/nodekell#repeat
     *
     * **Note**
     * - if use with run or run like function, please use lambda expression or function
     * const a = Promise.resolve('a');
     * const r0 = await F.run(a, e => repeat(e));
     * const r1 = await F.run(a, e => repeat(10, e));
     * @example
     * const r = F.repeat(()=>{return 3;});
     * for await(const e of r) {
     *     console.log(e);
     * }
     * // print
     * // 3
     * // 3
     * // 3
     * // ....
     * @param length repeat count
     * @param supply return value or call function
     */
    <T>(length: number | Promise<number>, supply: Promise<() => T>): AsyncIterableIterator<ExtractPromise<T>>;
    <T>(length: number | Promise<number>, supply: () => T): AsyncIterableIterator<ExtractPromise<T>>;
    <T>(length: number | Promise<number>, supply: T): AsyncIterableIterator<ExtractPromise<T>>;

    /**
     * @param supply return value or call function
     */
    <T>(supply: Promise<() => T>): AsyncIterableIterator<ExtractPromise<T>>;
    <T>(supply: () => T): AsyncIterableIterator<ExtractPromise<T>>;
    <T>(supply: T): AsyncIterableIterator<ExtractPromise<T>>;
}

/**
 * arity 1 : [Infinity, arg1]
 * arity 2 : [arg1, arg2]
 */
const repeatFetchArgument = async (a: any, b: any) => {
    a = await a;
    if (b.length > 0) {
        return [a, await b[0]];
    }
    return [Infinity, a];
};

/**
 * supply
 * F.repeat(5) => [5,5,5,....]
 *
 * count and supply
 * F.repeat(3, 5) => [5,5,5]
 */
export const repeat: Repeat = async function *(a: any, ...b: any[]) {
    const [len, supply] = await repeatFetchArgument(a, b);
    if (supply instanceof Function) {
        for (let i = len; i > 0; --i) {
            yield supply();
        }
    } else {
        for (let i = len; i > 0; --i) {
            yield supply;
        }
    }
};
