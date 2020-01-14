/**
 * @example
 * inc([1,2,3]);            // '1,2,31'
 * inc(NaN);                // NaN
 * inc(null);               // 1
 * inc(undefined + 1);      // NaN
 * inc({});                 // 1
 * inc(new Int32Array(1));  // "01"
 * inc("hello");            // "hello1"
 * @param a any object
 */
export interface Inc {
    (a: null): number;
    (a: undefined): number;
    (a: number): number;
    (a: string): string;
    (a: Array<any>): string;
    (a: any): any;
}
export const inc: Inc = (a: any): any => a + 1;
