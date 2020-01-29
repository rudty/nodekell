import { curry } from "./curry";
export interface Sub {
    /**
     * a - b
     * @param a lhs
     * @param b rhs
     */
    (a: number, b: number): number;
    (a: number): (b: number) => number;
    (a: any, b: any): number;
    (a: any): (b: any) => number;
}

export const sub: Sub = curry((a: any, b: any) => a - b);
