import { curry } from "./curry";
import { _isObjectArray, _isString } from "./internal/typeTraits";
const equalFunction = {};
equalFunction.map_internal = (lhs, rhs) => {
    if (lhs.size !== rhs.size) {
        return false;
    }

    for (const kv of lhs) {
        if (!rhs.has(kv[0])) {
            return false;
        }

        if (!equalFunction.fn(rhs.get(kv[0]), kv[1])) {
            return false;
        }
    }
    return true;
};

equalFunction.set_internal = (lhs, rhs) => {
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

equalFunction.regExp_internal = (lhs, rhs) => {
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

equalFunction._array_internal = (lhs, rhs, comparator) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        /**
         * Array: recur equal(lhs[i], rhs[i])
         * numeric Array: operator ===
         */
        if (!comparator(lhs[i], rhs[i])) {
            return false;
        }
    }
    return true;
};

equalFunction.object_internal = (lhs, rhs) => {

    const kvl = Object.entries(lhs);

    if (kvl.length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [k, v] of kvl) {
        if (!rhs.hasOwnProperty(k)) {
            return false;
        }

        if (!equalFunction.fn(v, rhs[k])) {
            return false;
        }
    }

    return true;
};

equalFunction.toString_internal = (a) => Object.prototype.toString(a);

equalFunction.fn = curry((lhs, rhs) => {
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
            _isString(lhs) || 
            lhs instanceof Number || 
            lhs.constructor === Number ||
            lhs instanceof Boolean ||
            lhs.constructor === Boolean ||
            lhs instanceof Date) {
            return lhs.valueOf() === rhs.valueOf();
        }

        if (lhs instanceof Array) {
            return equalFunction._array_internal(lhs, rhs, equalFunction.fn);
        }

        if (_isTypedArray(lhs) || _isObjectArray(lhs)) {
            return equalFunction._array_internal(lhs, rhs, (a, b) => a === b);
        }

        if (lhs instanceof Map) {
            return equalFunction.map_internal(lhs, rhs);
        }

        if (lhs instanceof Set) {
            return equalFunction.set_internal(lhs, rhs);
        }

        if (lhs instanceof RegExp) {
            return equalFunction.regExp_internal(lhs, rhs);
        }

        if (lhs instanceof Promise) {
            // :(
            return false;
        }

        if (equalFunction.toString_internal(lhs) !== equalFunction.toString_internal(rhs)) {
            return false;
        }

        if (lhs instanceof Object) {
            return equalFunction.object_internal(lhs, rhs);
        }
    } else {
        //NaN === NaN => false
        if (Number.isNaN(lhs) && Number.isNaN(rhs)) {
            return true;
        }
    }
    return false;
});
export const equals = equalFunction.fn;