import { curry } from "./curry";

export const emptyThen = curry(async function*(supply, iter) {
    for await (const e of iter) {
        yield e;
        yield* iter;
        return;
    }

    supply = await supply;
    if (supply instanceof Function) {
        yield* await supply();
    } else {
        yield* supply;
    }
});
