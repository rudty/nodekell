import { curry } from "./curry";
import { run } from "./run";
import { _toIterator } from "./internal/iterable";
import { map } from "./map";
import { flat } from "./flat";
import { collectObject } from "./collectObject";
import { Iter } from "./internal/typeTraits";

export interface MergeObjectType {
    /**
     * Create a new object by combining the arguments of the function.
     * If the key exists, the value on the right is used.
     *
     * @example
     *      const m1 = new Map([[1, 2], [3, 4]]);
     *      const o1 = { 5: 6, 7: 8 };
     *      const r1 = await F.mergeObject(m1, o1);
     *      console.log(r1); // print { '1': 2, '3': 4, '5': 6, '7': 8 }
     */
    (source1: Iter<[any, any]> | object, source2: Iter<[any, any]> | object, ...sources: (Iter<[any, any]> | object)[]): Promise<any>;
    (source1: Iter<[any, any]> | object): (source2: Iter<[any, any]> | object, ...sources: (Iter<[any, any]> | object)[]) => Promise<any>;
}

export const mergeObject: MergeObjectType = curry(async (source1: any, source2: any, ...sources: any[]) =>
    run([source1, source2, ...sources],
        map(_toIterator),
        flat,
        collectObject));
