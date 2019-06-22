import { curry } from "./curry";
import { seq } from "./seq";
export const zipWith3 = curry(async function*(f, a, b, c) {
    a = seq(a);
    b = seq(b);
    c = seq(c);

    while (true) {
        const ap = a.next();
        const bp = b.next();
        const cp = c.next();

        const ae = await ap;
        const be = await bp;
        const ce = await cp;

        if (ae.done || be.done || ce.done) {
            break;
        }

        yield f(ae.value, be.value, ce.value);
    }
});