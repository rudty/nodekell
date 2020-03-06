import { mustEvenArguments, PairRepeat, Prepend, DropElement, Flat, Head, Second, Length, ExtractPromise, Tail } from "./internal/typeTraits";
import { otherwise } from "./otherwise";

export type Find<E, T extends any[]> = {
    0: Find<E, Tail<T>>;
    1: Head<T>;
}[
    Head<T> extends E ?
        1 : Length<T> extends 0 ? never : 0
];

export type PickElements<N extends 0 | 1, T extends any[], I extends any[] = []> = {
    0: PickElements<N, DropElement<2, T>, Prepend<N extends 0 ? Head<T> : Second<T>, I>>;
    1: Head<T> | Flat<I>;
    2: Second<T> | Flat<I>;
}[
    Length<T> extends 0 ?
        N extends 0 ?
            1 : 2 : 0
];

export interface CondFunctionType {
    <T extends PairRepeat<2, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<4, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<6, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<8, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<10, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<12, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<14, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<16, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<18, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<20, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<22, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<24, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<26, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<28, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<30, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<32, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<34, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<36, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<38, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
    <T extends PairRepeat<40, boolean | Promise<boolean> | typeof otherwise, any>>(...a: T): Promise<ExtractPromise<Find<true | Promise<true> | typeof otherwise, T> extends never ? PickElements<1, T> | undefined : PickElements<1, T>>>;
}

export const cond: CondFunctionType = <any> (async (...cv: any[]) => {
    mustEvenArguments(cv);

    for (let i = 0; i < cv.length; i += 2) {
        if (await cv[i]) {
            return cv[i + 1];
        }
    }
    // return undefined
});
