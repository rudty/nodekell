import { _isString, _hasIterator } from "./internal/typeTraits";

export const dflat = async function *(...iters) {
    for await (const it of iters) {
        if (it) {
            if (_isString(it)) {
                yield* it;
                continue;
            } else if (_hasIterator(it)) {
                for await (const e of it) {
                    yield* dflat(e);
                }
                continue;
            }
        }
        yield it;
    }
};