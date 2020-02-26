import { _headTail } from "./internal/headTail";
import { equals } from "./equals";
import { curry } from "./curry";
import { Iter, _FlatFunc1, _Func1, FlatForInternalFn } from "./internal/typeTraits";

export interface DistinctUntilChangedBy {
    /**
     * @example
     * const a = [1,2,2,3,3,3,4,4,5,5,5,5];
     * const r = F.distinctUntilChangedBy(F.identity, a);
     * for await (const e of r) {
     *   console.log(e);
     * }
     * // print
     * // 1
     * // 2
     * // 3
     * // 4
     * // 5
     * @param f distinct function
     * @param iter any iterator
     */
    <T>(f: _Func1<T, any>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatFunc1<T, any>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatFunc1<T, any>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Func1<T, any>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const distinctUntilChangedBy: DistinctUntilChangedBy = curry(async function *(f: any, iter: any) {
    const [h, g] = await _headTail(iter);
    let head = h;
    yield head;
    head = await f(head);

    for await (const e of g) {
        const v = await f(e);
        if (!equals(head, v)) {
            head = v;
            yield e;
        }
    }
});
