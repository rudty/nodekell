import { curry } from "./curry";

/**
 * frequency Count
 * 
 * @param {Promise<Map>} frequencyMap
 */
export const frequencies = curry(async (iter) => {
    const m = new Map();

    for await (const e of iter) {
        const cnt = (m.get(e) || 0) + 1;
        m.set(e, cnt);
    }

    return m;
});