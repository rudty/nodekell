import { curry } from "./curry"
import { seq } from "./seq"

/**
 * break is keyword..
 */
export const split = curry(async function*(fn, iter) {
    const g = seq(iter);
    let e;
    yield (async function*() {
        while (true) {
            e = await g.next();
            if ((e.done) || await fn(e.value)) {
                break;    
            }
            yield e.value;
        }
    })();
    yield (async function*() {
        if (!e.done) {
            yield e.value;
            yield* g;
        }
    })();
});