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
    if (iter[Symbol.asyncIterator]) {
        return iter[Symbol.asyncIterator]();
    }
    return _seq(iter);
};
