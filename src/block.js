/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { _toIterator } from "./internal/toIterator";

export const block = async (...iters) => {
    for (const iter of iters) {
        const it = _toIterator(await iter);
        for await (const _ of it) {
            //ignore
        }
    }
};