import { seq } from "./seq";
import { curry } from "./curry";
export const dropWhile =  curry(async function * (f, iter) {
    const g =  seq(iter);
    while (true) {
        const e = await g.next();
        if (e.done) {
            return;
        }

        if(!(await f(e.value))) {
            yield e.value;
            break;
        }
    }
    yield* g;
});
