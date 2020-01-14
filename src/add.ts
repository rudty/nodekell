import { curry } from "./curry";
export interface Add {
    /**
     * a + b
     */
    (a: number, b: number): number;
    (a: string, b: string): string;
    (a: any, b: any): any;
    (a: number): (b: number) => number;
    (a: string): (b: string) => string;
    (a: any): (b: any) => any;
}

export const add: Add = curry((a: any, b: any): any => a + b);
