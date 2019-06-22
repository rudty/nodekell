import { curry } from "./curry"

let _equals;

const equalsMap_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const kv of lhs) {
        if (!rhs.has(kv[0])) {
            return false;
        }

        if (!_equals(rhs.get(kv[0]), kv[1])) {
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
        if (!_equals(lhs[i], rhs[i])) {
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

    const kvl = Object.entries(lhs);

    if (kvl.length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [k, v] of kvl) {
        if (!rhs.hasOwnProperty(k)) {
            return false;
        }

        if (!_equals(v, rhs[k])) {
            return false;
        }
    }

    return true;
};

const equals_string_internal = a => Object.prototype.toString(a);

_equals = curry((lhs, rhs) => {
    if (lhs === rhs) {
        // undefined === undefined => true
        // null === null => true
        // 0 === 0 => true
        return true;
    }

    if (lhs && rhs) {
        if (lhs.constructor !== rhs.constructor) {
            return false;
        }

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
            lhs instanceof Uint8ClampedArray ||
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

        if (lhs instanceof Promise) {
            // :(
            return false;
        }

        if (equals_string_internal(lhs) !== equals_string_internal(rhs)) {
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
export const equals = _equals;