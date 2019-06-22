import { curry } from "./curry";
import { seq } from "./seq" ;
export const zipWith = curry(async function *(f, a, b) {
    a = seq(a);
    b = seq(b);

    while (true) {
        const ap = a.next();
        const bp = b.next();

        const ae = await ap;
        const be = await bp;

        if (ae.done || be.done) {
            break;
        }

        yield f(ae.value, be.value);
    }
});