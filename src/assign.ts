import { curry } from "./curry";
import { MergeObject } from "./internal/typeTraits";

export interface AssignType {
    /**
     * merge from right to left
     * returns new object
     * @example
     * const obj0 = { a: 1 };
     * const obj1 = { b: 1 };
     * const r = F.assign(obj0);
     * console.log(r(obj1));
     * // print { a: 1, b: 1 };
     * @param target target object to copy to
     * @param source source objects from which to copy properties
     */
    <S1 extends object, S extends object[] = []>(source1: S1, ...sources: S): MergeObject<MergeObject<S1, [S1]>, S>;
    <S1 extends object, S extends object[] = []>(target: S1): <_S1 extends object = S1, _S extends object[] = S>(source1: _S1, ...sources: _S) => MergeObject<MergeObject<S1, [_S1]>, _S>;
}

export const assign: AssignType = <any> curry((target: any, source: any, ...sources: any[]) => {
    return Object.assign({}, target, source, ...sources);
});
