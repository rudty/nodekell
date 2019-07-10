import { _hasIterator } from "./internal/typeTraits";

export const count = async (iter) => {
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