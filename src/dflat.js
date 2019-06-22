export const dflat = async function *(...iters) {
    for await (const it of iters) {
        if (it) {
            if (it.constructor === String) {
                yield* it;
                continue;
            } else if (it[Symbol.asyncIterator] || it[Symbol.iterator]) {
                for await (const e of it) {
                    yield* dflat(e);
                }
                continue;
            }
        }
        yield it;
    }
};