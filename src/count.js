export const count = async (iter) => {
    //array, string
    if (iter.length && Number.isInteger(iter.length)) {
        return iter.length;
    }

    //map, set, any collection
    if (iter.size && Number.isInteger(iter.size)) {
        return iter.size;
    }

    //iterators
    if (iter[Symbol.asyncIterator] || iter[Symbol.iterator]) {
        let c = 0;
        for await (const _ of iter) {
            ++c;
        }
        return c;
    }

    //object
    return Object.keys(iter).length;
};