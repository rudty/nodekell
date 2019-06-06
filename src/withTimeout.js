import { getDuration, errorSleep } from "./internal/timer"

exports.withTimeout = C.curry(async function*(duration, iter) {
    duration = await getDuration(duration);

    const g = C.seq(iter);
    const s = errorSleep(duration);

    while(true) {
        const it = g.next();
        const e = await Promise.race([s, it]);
        if(e.done) {
            break;
        }
        yield e.value;
    }
    s.catch(C.fnothing);
});