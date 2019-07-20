const _seq = async function *(iter) {
    for await (const e of iter) {
        yield e;
    }
};

/**
 * make async generator
 * do not need to check iter is any
 */
export const seq = (iter) => {
    const it = iter[Symbol.asyncIterator];
    if (it) {
        return it.call(iter);
    }
    return _seq(iter);
};
