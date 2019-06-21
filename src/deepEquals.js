import { curry } from "./curry"

const equalsMap_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const kv of lhs) {
        if (rhs.get(kv[0]) !== kv[1]) {
            return false;
        }
    }
    return true;
};

const equalsSet_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const e of lhs) {
        if (!rhs.has(e)) {
            return false;
        }
    }
    return true;
};

const equalsRegExp_internal = (lhs, rhs) => {
    if (lhs.sticky !== rhs.sticky) {
        return false;
    }

    if (lhs.unicode !== rhs.unicode) {
        return false;
    }

    if (lhs.ignoreCase !== rhs.ignoreCase) {
        return false;
    }

    if (lhs.global !== rhs.global) {
        return false;
    }

    if (lhs.multiline !== rhs.multiline) {
        return false;
    }

    if (lhs.source !== rhs.source) {
        return false;
    }
    return true;
};

export const deepEquals = curry((a, b) => {
    if (a === b) {
        return true;
    }

    if (a.constructor !== b.constructor) {
        return false;
    }

    if (a && b) {
        /*
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
        if (a instanceof String || 
            a.constructor === String || 
            a instanceof Number || 
            a.constructor === Number ||
            a instanceof Boolean ||
            a.constructor === Boolean ||
            a instanceof Date) {
            return a.valueOf() === b.valueOf();
        }

        if (a instanceof Array) {
            const len = a.length;
            if (len !== b.length) {
                return false;
            }
        
            for (let i = len - 1; i >= 0; --i) {
                if (!deepEquals(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }

        if (a instanceof Map) {
            return equalsMap_internal(a, b);
        }

        if (a instanceof Set) {
            return equalsSet_internal(a, b);
        }

        if (a instanceof RegExp) {
            return equalsRegExp_internal(a, b);
        }

        if (a.toString() !== b.toString()) {
            return false;
        }

        if (a instanceof Object) {
            const kva = Object.entries(a);
            const kvb = Object.entries(a);

            if (kva.length !== kvb.length) {
                return false;
            }

            const len = kva.length;
            for (let i = len - 1; i >= 0; --i) {
                if (!deepEquals(kva[i][0], kvb[i][0])) {
                    return false;
                }

                if (!deepEquals(kva[i][1], kvb[i][1])) {
                    return false;
                }
            }
            return true;
        }
    } else {
        //NaN === NaN => false
        if (Number.isNaN(a) && Number.isNaN(b)) {
            return true;
        }
    }
    return false;
});
