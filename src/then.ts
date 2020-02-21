import { curry } from "./curry";

export interface ThenType {
    /**
     * like promise then
     * @example
     * const v = await F.run([1,2,3,4,5],
     *     F.then(async function*(iter) {
     *         for await(const e of iter) {
     *             console.log(e);
     *             yield e;
     *         }
     *     }),
     *     F.map(e => e + 1),
     *     F.collect);
     * console.log(v);
     * // print
     * // 1
     * // 2
     * // 3
     * // 4
     * // 5
     * // [2,3,4,5,6]
     * @param f run function 1 arg
     * @param t arg
     */
    <T, R>(f: (t: T) => R, t: T): R;
    <T, R>(f: (t: T) => R): (t: T) => R;
}

export const then: ThenType = curry((f: any, arg: any) => f(arg));
