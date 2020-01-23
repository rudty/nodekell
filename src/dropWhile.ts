import { seq } from "./seq";
import { curry } from "./curry";
import { _FlatFunc1, FlatForInternalFn, _FlatPredicate, Iter, _Predicate } from "./internal/typeTraits";
export interface DropWhile {
    /**
     * drop element
     * @example
     * const a = [1,2,3,4,1];
     * const r = F.dropWhile(e=> e < 3, a)
     * const result = await F.collect(r);
     * console.log(result); // print [3,4,1]
     *
     * @param f drop function
     * @param iter any iterator
     */
    <T>(f: _Predicate<T>, iter: Iter<T | Promise<T>>): AsyncIterableIterator<T>;
    <T extends Iter<any>>(f: _FlatPredicate<T>, iter: T): AsyncIterableIterator<FlatForInternalFn<T>>;
    <T extends Iter<any>>(f: _FlatPredicate<T>): (iter: T) => AsyncIterableIterator<FlatForInternalFn<T>>;
    <T>(f: _Predicate<T>): (iter: Iter<T | Promise<T>>) => AsyncIterableIterator<T>;
}
export const dropWhile: DropWhile = curry(async function *(f: any, iter: Iter<any>): AsyncIterableIterator<any> {
    const g = seq(iter);
    while (true) {
        const e = await g.next();
        if (e.done) {
            return;
        }

        if (!(await f(e.value))) {
            yield e.value;
            break;
        }
    }
    yield* g;
});
