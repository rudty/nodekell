import { seq } from "./seq";
export const head = async (iter) => {
    const g =  seq(iter);
    const { value, done } = await g.next();
    if (done) {
        throw new Error("empty iter");
    }
    return value;
};
