import { sleep } from "./sleep";

export const interval = (timeout, timerHandler, ...param) => {

    if(!timeout || timeout < 10) {
        timeout = 10;
    }
    const k = { run: true };
    (async () => {
        while (k.run) {
            try {
                const s = sleep(timeout);
                await timerHandler(...param);
                await s;
            } catch {
                //ignore
            }
        }
    })();
    return k;
};
