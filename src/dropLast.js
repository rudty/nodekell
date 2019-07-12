import { seq } from "./seq";
import { curry } from "./curry";
import { _Queue } from "./Queue";
const addNext = async (q, g) => {
    const e = await g.next();
    if (e.done) {
        return false;
    }
    q.add(e.value);
    return true;
};

export const dropLast = curry(async function *(count, iter) {
    const g = seq(iter);
    const q = new _Queue();
    
    for (let i = 0; i < count; i++) {
        if(!(await addNext(q, g))) {
            return;
        }
    }
    
    while ((await addNext(q, g))) {
        yield q.poll();
    }
});
