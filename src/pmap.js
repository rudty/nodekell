import { curry } from "./curry";
import * as P from "./internal/parallel";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/fetchIterator";

const fetch_map_internal = (f, fn, iter) => {
    const fetchCount = P.parallel_get_fetch_count_internal() - 1;
    return _fetchAndGetIterator(fetchCount, iter, (e) => f.add(fn(e)));
};

export const pmap = curry(async function *(fn, iter) {
    const f = new _Queue();
    const g = await fetch_map_internal(f, fn, iter);

    for await (const e of g) {
        f.add(fn(e));
        yield f.poll();
    }

    yield* f.removeIterator();
});

export const pfmap = curry(async function *(fn, iter) {
    const f = new _Queue();
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
