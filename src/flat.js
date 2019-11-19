import { _flatOnce } from "./internal/iterable";

export const flat = async function *(iter) {
    for await (const e of iter) {
        yield* _flatOnce(e);        
    }
};