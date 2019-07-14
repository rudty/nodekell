import { curry } from "./curry";

export const mostFrequencyBy = curry(async (fn, iter) => {
    const m = new Map();
    let mostValue;
    let mostCount = 0;
    for await (const e of iter) {
        const v = await fn(e);
        const frequency = (m.get(v) || 0) + 1;
        m.set(v, frequency);

        if (frequency > mostCount) {
            mostCount = frequency;
            mostValue = e;
        }
    }

    return mostValue;
});