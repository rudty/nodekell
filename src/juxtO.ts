import { curry } from "./curry";
import { get } from "./get";
import { Getter } from "./internal/typeTraits";

interface JuxtO {
    /**
     * Similar `get`, get the value of an array element from an object or map.
     *
     * @example
     * const r0 = await juxtO(["A","C"], {A:1,B:2,C:3});
     * console.log(r0); // print [1, 3]
     *
     * const r1 = await juxtO(["A","C"], {});
     * console.log(r1); // print [undefined, undefined]
     *
     * const r2 = await juxtO(["A","C"],  new Map([["A", 1], ["B", 2], ["C", 3]]));
     * console.log(r2); // print [1,2]
     *
     * @param key get array
     * @param obj dest object or map
     */
    <T, K extends keyof T>(key: K[], target: T): Promise<Getter<T, K>[]>;
    <T, K>(key: K[], target: T): Promise<Getter<T, K>[]>;
    <T, K extends keyof T>(key: K[]): (target: T) => Promise<Getter<T, K>[]>;
    <T, K>(key: K[]): (target: T) => Promise<Getter<T, K>[]>;
    (key: any[]): (target: any) => any[];
}

export const juxtO: JuxtO = <any> curry(async (ap: any, obj: any) => {
    const r = [];
    for await (const k of ap) {
        r.push(get(k, obj));
    }
    return r;
});
