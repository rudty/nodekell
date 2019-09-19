import { _fetchAndGetIterator } from "./fetchIterator";

const default_fetch_count = 100;
let global_fetch_count = default_fetch_count;

export const parallel_set_fetch_count_internal = (count) => {
    count = Number(count);
    if (count <= 0) {
        throw new Error("count > 0 required");
    }
    global_fetch_count = count || default_fetch_count;
};

export const parallel_get_fetch_count_internal = () => global_fetch_count;
