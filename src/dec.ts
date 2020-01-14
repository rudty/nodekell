export interface Dec {
    (a: null): number;
    (a: undefined): number;
    (a: number): number;
    (a: string): number;
    (a: Array<any>): number;
    (a: Date): number;
    (a: any): any;
}

/**
 * @example
 * dec([1,2,3]);            // NaN
 * dec(NaN);                // NaN
 * dec(null);               // -1
 * dec(undefined);          // NaN
 * dec({});                 // NaN
 * dec(new Int32Array(1));  // -1
 * dec("hello");            // NaN
 * @param a any object
 * @returns a - 1
 */
export const dec = (a: any): any => a - 1;
