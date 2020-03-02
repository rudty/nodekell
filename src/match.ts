import { equals } from "./equals";
import { Prepend, DropElement, Length, _isFunction, mustEvenArguments, Flat, Head, Second } from "./internal/typeTraits";

export type ReturnTypeIfFunction<T> = T extends (...args: any) => any ? ReturnType<T> : T;
/**
 * if PickElements is () => string | () => number
 * ReturnType<PickElements<...>> error
 */
export type ReturnTypePickElements<N extends 0 | 1, T extends any[], I extends any[] = []> = {
    0: ReturnTypePickElements<N, DropElement<2, T>, Prepend<N extends 0 ? ReturnTypeIfFunction<Head<T>> : ReturnTypeIfFunction<Second<T>>, I>>;
    1: ReturnTypeIfFunction<Head<T>> | Flat<I>;
    2: ReturnTypeIfFunction<Second<T>> | Flat<I>;
}[
    Length<T> extends 0 ?
        N extends 0 ?
            1 : 2 : 0
];

export type PairRepeat<N extends number, T, Y, I extends any[] = []> = {
    0: PairRepeat<N, T, Y, Prepend<T, Prepend<Y, I>>>;
    1: I;
}[
    Length<I> extends N ? 1 : 0
];

export interface MatchType {
    /**
     *  for pattern matching
     *  F._ is any match
     *
     * @example
     *  const value = 1;
     *
     *  F.match(value,
     *      0, () => console.log("value is 0"),
     *      1, () => console.log("value is 1"),
     *      2, () => console.log("value is 2")
     *  );
     * //print value is 1
     *
     *  const value2 = [1, 2, 3, 4, 5];
     *  F.match(value2,
     *      [1, 2], () => console.log("value is [1,2]"),
     *      [1, F._, F._, F._, F._], () => console.log("value is [1, any, any, any, any]")
     *  );
     *  //print value is [1, any, any, any, any]
     *
     * @param value match value
     * @param a must even [0]:compare, [1]: value, ...
     */
    <T, P extends PairRepeat<2, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<4, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<6, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<8, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<10, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<12, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<14, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<16, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<18, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<20, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<22, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<24, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<26, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<28, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
    <T, P extends PairRepeat<30, T, any>>(value: T, ...a: P): ReturnTypePickElements<1, P> | undefined;
}

export const match = (value: any, ...cv: any[]) => {
    mustEvenArguments(cv);
    for (let i = 0; i < cv.length; i += 2) {
        if (equals(value, cv[i])) {
            if (_isFunction(cv[i + 1])) {
                return cv[i + 1](value);
            }
            return cv[i + 1];
        }
    }
    // return undefined;
};
