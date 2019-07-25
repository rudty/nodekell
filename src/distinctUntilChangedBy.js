import { _headTail } from "./internal/headTail";
import { equals } from "./equals";
import { curry } from "./curry";

export const distinctUntilChangedBy = curry(async function *(f, iter) {
    let [head, g] = await _headTail(iter);
    yield head;
    head = await f(head);

    for await (const e of g) {
        const v = await f(e);
        if (!equals(head, v)) {
            head = v;
            yield e;
        }
    }
});
