
const objectIterator = function* (object) {
    const keys = Object.keys(object);
    for (const k of keys) {
        yield [k, object[k]];
    }
};

export const _toIterator = (a) => {
    if (a) {
        const it = a[Symbol.iterator];
        if (it) {
            return it.call(a);
        }

        const ait = a[Symbol.asyncIterator];
        if (ait) {
            return ait.call(a);
        }

        return objectIterator(a);
    }
    //return undefined;
};
