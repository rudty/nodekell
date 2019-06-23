import { seq } from "./seq";
export const head = async (iter) => {
    const g = seq(iter);
    const e = await g.next();
    if (e.done) {
        throw new Error("empty iter");
    }
    return e.value;
};
