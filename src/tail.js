import { seq } from "./seq";
export const tail = async function* (iter) {
    const g = seq(iter);
    const { done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    yield* g;
};