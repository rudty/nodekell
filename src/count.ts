import { _hasIterator, Iter } from "./internal/typeTraits";
export interface Count {
    /**
     * get count count
     * @example
     * const a = [1,2,3,4,5];
     * const n = await F.count(a);
     * console.log(n); // print 5
     */
    (iter: Iter<any>): Promise<number>;
    (obj: object): Promise<number>;
}

export const count: Count = async (iter: any): Promise<number> => {
    //array, string
    if (Number.isSafeInteger(iter.length)) {
        return iter.length;
    }

    //map, set, any collection
    if (Number.isSafeInteger(iter.size)) {
        return iter.size;
    }

    //iterators
    if (_hasIterator(iter)) {
        let c = 0;
        for await (const _ of iter) {
            ++c;
        }
        return c;
    }

    //object
    return Object.keys(iter).length;
};