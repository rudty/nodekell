import { curry } from "./curry";
import { getDuration, errorSleep } from "./internal/timer";
import { fnothing } from "./fnothing";

export interface Timeout {
    /**
     * If the function does not finish within the input time, Promise.reject is returned.
     * @example
     * try{
     *      await F.timeout(40, async ()=>{
     *          await F.sleep(1000);
     *      });
     * } catch(e) {
     *      console.log(e);
     * }
     * // print
     * // timeout error
     * // callstack...
     * @param duration timeout millis
     * @param job run function
     */
    <T>(duration: number | Promise<number> | (() => (number | Promise<number>)), job: Promise<T> | (() => Promise<T>)): Promise<T>;
    <T>(duration: number | Promise<number> | (() => (number | Promise<number>))): (job: Promise<T> | (() => Promise<T>)) => Promise<T>;
}

export const timeout: Timeout = curry(async (duration: any, a: any): Promise<any> => {
    duration = await getDuration(duration);

    const s = errorSleep(duration);

    if (a instanceof Function) {
        a = a();
    }

    const r = Promise.race([s, a]);
    const e = await r;
    s.catch(fnothing);
    return e;
});
