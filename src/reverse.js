import { collect } from "./collect";

export const reverse = async function* (iter) {
    const a = await collect(iter);
    for (let i = a.length - 1; i >= 0; i -= 1) {
        yield a[i];
    }
};
