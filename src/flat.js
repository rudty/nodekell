export const flat = async function* (iter) {
    for await (const e of iter) {
        if (e && (e[Symbol.iterator] || e[Symbol.asyncIterator])) {
            yield* e;
        } else {
            yield e;
        }
    }
};