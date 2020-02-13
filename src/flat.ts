import { _flatOnce } from "./internal/iterable";
import { Iter, PFlatP } from "./internal/typeTraits";

export interface FlatType {
    /**
     * flattern iterator
     * @example
     * const a = [
     *         [Promise.resolve(1)],
     *         Promise.resolve([2]),
     *         [3],
     *         [4],
     *         5];
     * const f = F.flat(a);
     * console.log(await F.collect(f)); // print [1,2,3,4,5]
     * @param iter any iterator
     */
    <T>(iter: Iter<T>): AsyncIterableIterator<PFlatP<T>>;
}

export const flat: FlatType = async function *(iter: any) {
    for await (const e of iter) {
        yield* _flatOnce(e);
    }
};
