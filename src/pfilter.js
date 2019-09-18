import { curry } from "./curry";
import * as P from "./internal/parallel";
import { _Queue } from "./Queue";
import { _fetchAndGetIterator } from "./internal/fetchIterator"

const fetch_filter_internal = (f, v, fn, iter) => {
    const fetchCount = P.parallel_get_fetch_count_internal() - 1;
    return _fetchAndGetIterator(fetchCount, iter, (e) => {
        f.add(fn(e));
        v.add(e);
    });
}

export const pfilter = curry(async function *(fn, iter) {
    const f = new _Queue();
    const v = new _Queue();
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
