import * as P from "./runtime";
import { _fetchAndGetIterator } from "./iterable";

export const _fetchMapInternal = (f: any, fn: any, iter: any) => {
    const fetchCount = P.parallel_get_fetch_count_internal() - 1;
    return _fetchAndGetIterator(fetchCount, iter, (e) => f.add(fn(e)));
};
