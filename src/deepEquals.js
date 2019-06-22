import { curry } from "./curry"

let _deepEquals;

const equalsMap_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const kv of lhs) {
        if (_deepEquals(rhs.get(kv[0]), kv[1])) {
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

const equalsArray_internal = (lhs, rhs) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        if (!_deepEquals(lhs[i], rhs[i])) {
            return false;
        }
    }
    return true;
}

const equalsNumberArray_internal = (lhs, rhs) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }
    return true;
}


const equalsObject_internal = (lhs, rhs) => {
    const kva = Object.entries(lhs);
    const kvb = Object.entries(lhs);

    if (kva.length !== kvb.length) {
        return false;
    }

    const len = kva.length;
    for (let i = len - 1; i >= 0; --i) {
        if (!_deepEquals(kva[i][0], kvb[i][0])) {
            return false;
        }

        if (!_deepEquals(kva[i][1], kvb[i][1])) {
            return false;
        }
    }
    return true;
};

_deepEquals = curry((lhs, rhs) => {
    if (lhs === rhs) {
        return true;
    }

    if (lhs.constructor !== rhs.constructor) {
        return false;
    }

    if (lhs && rhs) {
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
        if (lhs instanceof String || 
            lhs.constructor === String || 
            lhs instanceof Number || 
            lhs.constructor === Number ||
            lhs instanceof Boolean ||
            lhs.constructor === Boolean ||
            lhs instanceof Date) {
            return lhs.valueOf() === rhs.valueOf();
        }

        if (lhs instanceof Array) {
            return equalsArray_internal(lhs, rhs);
        }

        if (lhs instanceof Int8Array ||
            lhs instanceof Int16Array || 
            lhs instanceof Int32Array ||
            lhs instanceof Uint8Array ||
            lhs instanceof Uint16Array ||
            lhs instanceof Uint32Array) {
            return equalsNumberArray_internal(lhs, rhs);
        }

        if (lhs instanceof Map) {
            return equalsMap_internal(lhs, rhs);
        }

        if (lhs instanceof Set) {
            return equalsSet_internal(lhs, rhs);
        }

        if (lhs instanceof RegExp) {
            return equalsRegExp_internal(lhs, rhs);
        }

        if (lhs.toString() !== rhs.toString()) {
            return false;
        }

        if (lhs instanceof Object) {
            return equalsObject_internal(lhs, rhs);
        }
    } else {
        //NaN === NaN => false
        if (Number.isNaN(lhs) && Number.isNaN(rhs)) {
            return true;
        }
    }
    return false;
});
export const deepEquals = _deepEquals;