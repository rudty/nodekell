import { curry } from "./curry"
export const iterate = curry(async function*(fn, v) {
    v = await v;
    yield v;
    while(true) {
        v = await fn(v);
        yield v;
    }
});
