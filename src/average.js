export const average = async (iter) => {
    let c = 0;
    let sum = 0;
    for await (const e of iter) {
        ++c;
        sum += e;
    }
    return sum / c;
};
