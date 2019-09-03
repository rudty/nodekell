/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { _toIterator } from "./internal/toIterator";

export const block = async (...iters) => {
    iters = await Promise.all(iters);
    for (const iter of iters) {
        if (iter) {
            const it = _toIterator(iter);

            for (; ;) {
                //for await (const e of iter) {} is 
                //May not work due to optimizations
                const { value, done } = await it.next();
                await value;
                if (done) {
                    break;
                }
            }
        }
    }
};