import { curry } from "./curry";
import { seq } from "./seq";
export const zipWith3 = curry(async function *(f, a, b, c) {
    const z = [seq(a), seq(b), seq(c)];

    while (true) {
        const elems = await Promise.all(z.map(e => e.next()));
        for (let i = 0; i < elems.length; ++i) {
            if (elems[i].done) {
                return;
            }
        }
        yield f(...(elems.map(e => e.value)));
    }
});