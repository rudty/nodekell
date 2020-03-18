import { _isFunction, _Predicate, Iter } from "./internal/typeTraits";
import { equals } from "./equals";
import { seq } from "./seq";
import { curry } from "./curry";

const _updateFirstFunction = async function *(value: any, comp: any, iter: any) {
    const g = seq(iter);
    for await (const e of g) {
        if (await comp(e)) {
            yield value;
            yield* g;
            return;
        } else {
            yield e;
        }
    }
};

export type LiteralWrapper<T> = T extends number ? number : T extends string ? string : T;

export interface UpdateFirstType {
    /**
     * In {iter}, update the first value that matches {x} to {value}.
     * @example
     *      const arr = [1, 2, 3];
     *      const r = F.updateFirst(
     *          99, // update value
     *          1,  // find value
     *          arr);
     *      for await (const e of r) {
     *          console.log(e);
     *      }
     *      // print
     *      // 99
     *      // 2
     *      // 3
     *
     * @param value update value
     * @param predicate update value or find function
     * @param iter any iterable
     */
    <T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: _Predicate<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: _Predicate<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
    <T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: Promise<_Predicate<T>>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: Promise<_Predicate<T>>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
    <T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: T | Promise<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T>(value: LiteralWrapper<T> | Promise<LiteralWrapper<T>>, predicate: T | Promise<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
    <T>(value: LiteralWrapper<T>): (predicate: (_Predicate<T>) | Promise<_Predicate<T>> | T | Promise<T>) => (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}

export const updateFirst: UpdateFirstType = curry(async function *(value: any, x: any, iter: any) {
    x = await x;
    if (_isFunction(x)) {
        yield* _updateFirstFunction(value, x, iter);
    } else {
        const compareFunction = equals(x);
        yield* _updateFirstFunction(value, compareFunction, iter);
    }
});
