import { curry } from "./curry";
import { Head, DropElement } from "./internal/typeTraits";

export type InnerJoinObject<T1 extends object, T2 extends object> = { [P in keyof T1 | keyof T2]: P extends keyof T1 ? T1[P] : P extends keyof T2 ? T2[P] : unknown };
export type IsEmpty<T extends any[]> =
    T extends [] ?
        false : true;

export type MergeObject<T extends object, P extends object[]> = {
    0: MergeObject<InnerJoinObject<Head<P>, T>, DropElement<1, P>>;
    1: T;
}[
    IsEmpty<P> extends true ?
        0 :
        1
];

export interface AssignType {
    /**
     * curry with Object.assign
     * Returns the target object.
     * @example
     * const obj0 = { a: 1 };
     * const obj1 = { b: 1 };
     * const r = F.assign(obj0);
     * console.log(r(obj1));
     * // print { a: 1, b: 1 };
     * @param target target object to copy to
     * @param source source objects from which to copy properties
     */
    <T extends object, S1 extends object, S extends object[] = []>(target: T, source1: S1, ...sources: S): MergeObject<MergeObject<T, [S1]>, S>;
    <T extends object, S1 extends object, S extends object[] = []>(target: T): <_S1 extends object = S1, _S extends object[] = S>(source1: _S1, ...sources: _S) => MergeObject<MergeObject<T, [_S1]>, _S>;
}

export const assign: AssignType = <any> curry((target: any, source: any, ...sources: any[]) => {
    return Object.assign({}, target, source, ...sources);
});
