import { sleep } from "./sleep";

export interface IntervalFunctionType {
    /**
     * works like built-in function setInterval
     * - timer works same time start of the function
     * - available async function.
     * - only one function is executed at a time.
     *  * **Note**
     * - if you want stop interval, set false timer.run
     * ```ts
     * const timer = interval(1000, () => fnothing());
     * timer.run = false;
     * ```
     * ```javascript
     * F.interval(10, async () => {
     *     await F.sleep(1000);
     *     console.log("WORK!");
     * });
     * ///print
     * //WORK!
     * // 1 sec
     * //WORK!
     * // 1 sec
     * //...
     * @param timeout interval time
     * @param timerHandler work function
     * @param args work function arguments
     */
    <A extends any[]>(timeout: number, timerHandler: (...args: A) => any, ...args: A): { run: boolean; };
}

export const interval: IntervalFunctionType = (timeout: any, timerHandler: any, ...param: any[]) => {
    timeout = Number(timeout);
    if (Number.isNaN(timeout) && timeout < 1) {
        timeout = 1;
    }

    const k = { run: true };

    const recur = async () => {
        const s = sleep(timeout);
        try {
            await timerHandler(...param);
        } catch (_) {
            // ignore
        }
        if (k.run) {
            s.then(recur);
        }
    };

    recur();
    return k;
};
