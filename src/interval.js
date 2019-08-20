import { sleep } from "./sleep";

export const interval = (timeout, timerHandler, ...param) => {

    if(!timeout || timeout < 10) {
        timeout = 10;
    }
    const k = { run: true };

    const recur = async () => {
        const s = sleep(timeout);
        try {
            await timerHandler(...param);
        } catch {
            // ignore
        }
        if (k.run) {
            s.then(recur);
        }
    };

    recur();
    return k;
};
