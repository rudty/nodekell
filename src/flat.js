import { _hasIterator } from "./internal/typeTraits";

export const flat = async function *(iter) {
    for await (const e of iter) {
        if (e && _hasIterator(e)) {
            yield* e;
        } else {
            yield e;
        }
    }
};