import { getDuration, errorSleep } from "./internal/timer";
import { curry } from "./curry";
import { seq } from "./seq";
import { fnothing } from "./fnothing";

export const withTimeout = curry(async function *(duration, iter) {
    duration = await getDuration(duration);

    const g = seq(iter);
    const s = errorSleep(duration);

    while(true) {
        const it = g.next();
        const e = await Promise.race([s, it]);
        if(e.done) {
            break;
        }
        yield e.value;
    }
    s.catch(fnothing);
});