import { curry } from "./curry";

export interface AssignRightType {
    /**
     * merge from right to left
     * returns new object
     * @example
     * const obj0 = { a: 1 };
     * const obj1 = { b: 1 };
     * const r = F.assignRight(obj0);
     * console.log(r(obj1));
     * // print { a: 1, b: 1 };
     * @param source1 source objects from which to copy properties
     * @param source2 source objects from which to copy properties
     * @param sources source objects from which to copy properties
     */
    <T, U>(source1: T, source2: U): U & T;
    <T, U, V>(source1: T, source2: U, source3: V): V & U & T;
    <T, U, V, W>(source1: T, source2: U, source3: V, source4: W): W & V & U & T;
    (source1: object, source2: object, source3: object, source4: object, ...sources: any[]): any;
    <T, U>(source1: T): (source2: U) => U & T;
    <T, U, V>(source1: T): (source2: U, source3: V) => V & U & T;
    <T, U, V, W>(source1: T): (source2: U, source3: V, source4: W) => W & V & U & T;
    (source1: object): (source2: object, source3: object, source4: object, ...sources: any[]) => any;
}

export const assignRight: AssignRightType = <any> curry((source1: any, source2: any, ...sources: any) => {
    return Object.assign.call(null, [source1, source2, ...sources].reverse());
});
