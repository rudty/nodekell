import { equals } from "./equals";
import { seq } from "./seq";
import { _takeValue } from "./internal/runtime";

export const removeFirst = async function *(elem, iter) {
    elem = await _takeValue(elem);
    const g = seq(iter);
    const eq = equals(elem);
    while(true) {
        const e = await g.next();
        if (e.done) {
            break;
        }

        if (eq(e.value)) {
            yield* g;
            return;
        } else {
            yield e.value;
        }
    }
};