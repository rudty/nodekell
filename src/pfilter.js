import { curry } from "./curry";
import { seq } from "./seq";
import * as P from "./internal/parallel";
import { Queue } from "./queue";

const fetch_filter_internal = async (f, v, fn, iter) => {
    //fetch (n - 1) here
    const fetch_count = P.parallel_get_fetch_count_internal() - 1;
    const g = seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.add(fn(e.value));
        v.add(e.value);
    }
    return g;
};

export const pfilter = curry(async function *(fn, iter) {
    const f = new Queue();
    const v = new Queue();
    const g = await fetch_filter_internal(f, v, fn, iter);
    for await (const e of g) {
        f.add(fn(e));
        v.add(e);

        const c = v.poll();
        if (await f.poll()) {
            yield c;
        }
    }

    while (!v.isEmpty()) {
        const c = v.poll(); 
        if (await f.poll()) {
            yield c;
        }
    }
});
