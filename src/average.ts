import { Iter } from "./internal/typeTraits";

export interface Average {
    /**
     * get average
     * @param iter any iterator
     * @returns average result
     */
    (iter: Iter<number | Promise<number>>): Promise<number>;
}

export const average = async (iter: Iter<any>): Promise<number> => {
    let c = 0;
    let sum = 0;
    for await (const e of iter) {
        ++c;
        sum += e;
    }
    return sum / c;
};
