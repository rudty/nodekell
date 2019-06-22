import { curry } from "./curry";
import { asc } from "./asc";
import { desc } from "./desc";

export const sortBy = curry(async function * (f, order, iter) {
    if (order.constructor === ''.constructor) {
        switch (order.trim().toLowerCase()) {
            case "asc":
                order = asc;
                break;
            case "desc":
                order = desc;
                break;
            default:
                throw new Error("please set order parameter to ASC or DESC or compare function");
        }
    }

    const t = [];
    const m = new Map();

    for await (const e of iter) {
        t.push(e);
        if (!m.has(e)) {
            m.set(e, await f(e));
        }
    }

    yield* t.sort((a, b) => {
        const ma = m.get(a);
        const mb = m.get(b);

        return order(ma, mb);
    });
});

export const orderBy = sortBy;
