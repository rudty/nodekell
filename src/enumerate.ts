import { Iter, ExtractPromise } from "./internal/typeTraits";

export interface EnumerateType {
    /**
     * like python enumerate
     * @example
     * const arr = ["a", "b", "c", "d", "e"];
     * for await (const [i, e] of F.enumerate(arr)) {
     *    console.log(i, e);
     * }
     * //print
     * // 0 'a'
     * // 1 'b'
     * // 2 'c'
     * // 3 'd'
     * // 4 'e'
     * @param iter any iterator
     */
    <T>(iter: Iter<T>): AsyncIterableIterator<[number, ExtractPromise<T>]>;
}

export const enumerate = async function *(iter: any) {
    let i = 0;
    for await (const e of iter) {
        yield [i++, e];
    }
};
