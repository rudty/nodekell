import { _isArrayLike, _hasIterator } from "./typeTraits";

const objectIterator = function *(object) {
    const keys = Object.keys(object);
    for (const k of keys) {
        yield [k, object[k]];
    }
};

export const _toStrictIterator = (a) => {
    if (a) {
        const it = a[Symbol.iterator];
        if (it) {
            return it.call(a);
        }

        const ait = a[Symbol.asyncIterator];
        if (ait) {
            return ait.call(a);
        }
    }
    //return undefined;
};

export const _toIterator = (a) => {
    if (a) {
        const s = _toStrictIterator(a);
        if (s) {
            return s;
        }
        return objectIterator(a);
    }
    //return undefined;
};

/**
 * Gets only the {index} value from the Collection object.
 */
export const _arrayElementIterator = (index, onNotArrayError) => async function *(iter) {
    iter = _toIterator(iter);
    for await (const e of iter) {
        if (_isArrayLike(e)) {
            yield e[index];
        } else {
            onNotArrayError(e);
        }
    }
};

/**
 * If the argument is iterable, the elements are returned as iterable.
 * If not, return the argument iterable
 * @param {*} a 
 * @returns {AsyncIterator}
 */
export const _flatOnce = async function *(a) {
    a = await a;
    if (a && _hasIterator(a)) {
        yield* a;
    } else {
        yield a;
    }
};
