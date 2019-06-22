import { seq } from "./seq";
import { curry } from "./curry";
export const drop =  curry(async function* (count, iter) {
    const g =  seq(iter);
    for (let i = 0; i < count; i++) {
        const { done } = await g.next();
        if (done) {
            break;
        }
    }
    yield* g;
});
