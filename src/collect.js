/**
 * make array
 * iterator to array
 */
export const collect = async (iter) => {
    const res = [];
    for await (const e of iter) {
        res.push(e);
    }
    return res;
};