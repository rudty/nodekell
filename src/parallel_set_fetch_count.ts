import * as P from "./internal/runtime";

export interface ParallelSetFetchCount {
    /**
     * Set the fetch count of the parallel functions.
     * after setting, the parallel function is called by count at the same time.
     * @example
     * F.parallel_set_fetch_count(3);
     *
     * await F.run(
     *     F.range(Infinity),
     *     F.pmap(async e =>{
     *         console.log(e);
     *         return e + 1;
     *     }),
     *     F.take(1),
     *     F.collect);
     * // print
     * // 0
     * // 1
     * // 2
     * @param count parallel count
     */
    (count: number): void;
 }
export const parallel_set_fetch_count: ParallelSetFetchCount = (count: number) =>
    P.parallel_set_fetch_count_internal(count);
