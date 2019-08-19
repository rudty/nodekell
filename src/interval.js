import { sleep } from "./sleep";

export const interval = (timeout, timerHandler, ...param) => {

    if(!timeout || timeout < 10) {
        timeout = 10;
    }
    const k = { run: true };
    
    const recur = async () => {
        try {
            const s = sleep(timeout);
            await timerHandler(...param);
            if (k.run) {
                s.then(recur);
            }
        } catch {
            // ignore
        }
    };

    recur();
    return k;
};
