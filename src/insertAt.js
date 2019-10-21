import { flatOnce } from "./internal/flatOnce";

export const insertAt = async function *(value, index, iter) {
    let i = 0;
    for await(const e of iter) {
        if (i++ === index) {
            yield* flatOnce(value);
        }
        yield e;
    }

    if (i <= index) {
        yield* flatOnce(value); 
    }
};