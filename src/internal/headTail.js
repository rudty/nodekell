import { seq } from "../seq";
/**
 * get head and tail
 * const [head, tail] = _headTail(iterator);
 * 
 * head = value
 * tail = generator
 * 
 * @param {Array | Iterable | AsyncIterable} iter 
 * @returns {Array} [head, tail]
 */
export const _headTail = async (iter) => {
    const g = seq(iter);
    const head = await g.next();
    if (head.done) {
        throw new Error("empty iter");
    }
    return [head.value, g];
};