import { _headTail } from "./internal/headTail";
import { equals } from "./equals";

export const distinctUntilChangedBy = curry(async function *(f, iter) {
    let [head, g] = await _headTail(iter);

    for await (const e of g) {
        const v = await f(e);
        if (!equals(head, v)) {
            head = v;
            yield e;
        }
    }
});
