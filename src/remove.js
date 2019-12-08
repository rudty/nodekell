import { equals } from "./equals";

export const removeFirst = (elem, iter) => {
    const res = [];
    let rm = false;
    for await (const e of iter) {
        if (rm === false && equals(elem, e)) {
            rm = true;
        } else {
            res.push(e);
        }
    }
    return res;
};