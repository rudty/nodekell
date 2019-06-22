import { curry } from "./curry";
import { getDuration, errorSleep } from "./internal/timer";
import { fnothing } from "./fnothing";

export const timeout = curry(async (duration, a) => {
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
