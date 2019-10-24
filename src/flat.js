import { flatOnce } from "./internal/flatOnce";

export const flat = async function *(iter) {
    for await (const e of iter) {
        yield* flatOnce(e);        
    }
};