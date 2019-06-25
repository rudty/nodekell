import { curry } from "./curry";
import * as P from "./internal/parallel";
import { Queue } from "./queue";

const fetch_filter_internal = (f, v, fn, iter) =>
    P.parallel_fetch_map_internal(iter, e => {
        f.add(fn(e));
        v.add(e);
    });

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
