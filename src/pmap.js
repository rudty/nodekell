import { curry } from "./curry";
import { seq } from "./seq";
import * as P from "./internal/parallel";
import { Queue } from "./queue";

export const fetch_map_internal = async (f, fn, iter) => {
    const fetch_count = P.parallel_get_fetch_count_internal() - 1; 
    const g = seq(iter);
    for (let i = fetch_count; i > 0; --i) {
        const e = await g.next();
        if (e.done) {
            break;
        }
        f.add(fn(e.value));
    }
    return g;
};

export const pmap = curry(async function * (fn, iter) {
    const f = new Queue();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield f.poll();
    }

    yield* f.removeIterator();
});

export const pfmap = curry(async function * (fn, iter) {
    const f = new Queue();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield* await f.poll();
    }

    while(!f.isEmpty()) {
        yield* await f.poll();
    }
});

export const pflatMap = pfmap;
