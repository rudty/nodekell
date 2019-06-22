/**
 * make generator
 * do not need to check if iter
 * Symbol.asyncIterator or Symbol.iterator
 */
export const seq = async function *(iter) {
    for await (const e of iter) {
        yield e;
    }
};
