import { curry } from "./curry";
import { seq } from "./seq";

export const scanl = curry(async function*(f, z, iter) {
    z = await z;
    yield z;
    for await (const e of iter) {
        z = await f(z, e);
        yield z;
    }
});

export const scanl1 = curry(async function*(f, iter) {
    const g =  seq(iter);
    const h = await g.next();
    if (!h.done) {
        yield* scanl(f, h.value, g);
    }
});
