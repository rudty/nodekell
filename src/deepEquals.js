import { curry } from "./curry"
import { deepEqual } from "assert";

export const deepEquals = curry(async (a, b) => {
    if (a === b) {
        return true;
    }

    if (a.constructor !== b.constructor) {
        return false;
    }

    if (a && b) {
        if (a[Symbol.iterator] && b[Symbol.iterator]) {
            const it1 = a[Symbol.iterator]();
            const it2 = b[Symbol.iterator]();
        
            while (true) {
                const e1 = it1.next();
                const e2 = it2.next();
                if (e1.done === !e2.done) {
                    //a = true && b = false 
                    //a = false && b = true
                    return false;
                }
                if (e1.done && e2.done) {
                    //true, true
                    break;
                }
                if (deepEquals(await e1.value, await e2.value)) {
                    return false;
                }
            }
            return true;
        }
/*
        if (a[Symbol.asyncIterator] && b[Symbol.asyncIterator]) {
            const it1 = a[Symbol.asyncIterator]();
            const it2 = a[Symbol.asyncIterator]();
        
            while (true) {
                const e1 = await it1.next();
                const e2 = await it2.next();
                if (e1.done === !e2.done) {
                    //a = true && b = false 
                    //a = false && b = true
                    return false;
                }
                if (e1.done && e2.done) {
                    //true, true
                    break;
                }
                if (deepEquals(await e1.value, await e2.value)) {
                    return false;
                }
            }
            return true;
        }
*/
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }

        if (a instanceof RegExp && b instanceof RegExp) {

            if (a.sticky !== b.sticky) {
                return false;
            }

            if (a.unicode !== b.unicode) {
                return false;
            }

            if (a.ignoreCase !== b.ignoreCase) {
                return false;
            }

            if (a.global !== b.global) {
                return false;
            }

            if (a.multiline !== b.multiline) {
                return false;
            }

            if (a.source !== b.source) {
                return false;
            }
            return true;
        }

        if (a instanceof Object && b instanceof Object) {
            const kva = Object.entries(a);
            const kvb = Object.entries(a);

            if (kva.length !== kvb.length) {
                return false;
            }

            const len = kva.length;
            for (let i = len - 1; i >= 0; --i) {
                if (kva[i][0] !== kvb[i][0]) {
                    return false;
                }

                if (!deepEqual(kva[i][1], kvb[i][1])) {
                    return false;
                }
            }
        }



    }
    return false;
});
