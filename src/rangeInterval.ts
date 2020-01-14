import { getDuration } from "./internal/timer";
import { range } from "./range";
import { sleep } from "./sleep";

export interface RangeInterval {
    /**
     * Returns an iterator that generates numbers.
     *
     * @example
     * for await (const e of F.rangeInterval(100, 5, 0, -1)) {
     *     console.log(e);
     * }
     * //print
     * // [sleep 100]
     * // 5
     * // [sleep 100]
     * // 4
     * // [sleep 100]
     * // 3
     * // [sleep 100]
     * // 2
     * // [sleep 100]
     * // 1
     * // [sleep 100]
     *
     * @param duration sleep interval
     * @param begin from
     * @param end to
     * @param step change
     */
    (duration: number | Promise<number> | (() => (number | Promise<number>)), begin: number, end: number, step?: number): AsyncIterableIterator<number>;
    (duration: number | Promise<number> | (() => (number | Promise<number>)), end?: number): AsyncIterableIterator<number>;
}

export const rangeInterval: RangeInterval = async function *(duration: any, ...k: any[]): AsyncIterableIterator<number> {
    duration = await getDuration(duration);

    await sleep(duration);
    for (const e of range(...k)) {
        yield e;
        await sleep(duration);
    }
};
