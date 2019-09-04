/* eslint-disable no-unused-vars */
import { _toStrictIterator } from "./internal/toIterator";

export const block = async (...iters) => {
    iters = await Promise.all(iters);
    for (const iter of iters) {
        const it = _toStrictIterator(iter);
        if (it) {
            for (; ;) {
                //for await (const e of iter) {} is 
                //May not work due to optimizations
                const { value, done } = await it.next();
                if (done) {
                    break;
                }

                await value;
            }
        }
    }
};