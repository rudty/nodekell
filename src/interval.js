import { sleep } from "./sleep";

export const interval = (timeout, timerHandler, ...param) => {
    timeout = Number(timeout);
    if(Number.isNaN(timeout) && timeout < 1) {
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
