import { curry } from "./curry";
export const buffer = curry(async function * (supply, iter) {
    supply = await supply;

    if(supply <= 0) {
        throw new Error("arg supply > 0 required");
    }

    let c = [];
    for await (const e of iter) {
        const len = c.push(e);
        if (len >= supply) {
            yield c;
            c = [];
        }
    }

    if (c.length !== 0) {
        yield c;
    }
});