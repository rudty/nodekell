import { curry } from "./curry";
import { _isObjectArray, _isTypedArray, _isPrimitiveWrapper, _isFunction } from "./internal/typeTraits";
import { underBar } from "./_";
import { undefinedValue } from "./internal/runtime";

let _equals;

const map_internal = (lhs, rhs) => {
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

const set_internal = (lhs, rhs) => {
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

const regExp_internal = (lhs, rhs) => {
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

const typedArray_internal = (lhs, rhs) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        // ignore this eslint duplicate warn
        if (lhs[i] !== rhs[i]) {
            return false;
        }
    }
    return true;
};

const array_internal = (lhs, rhs) => {
    const len = lhs.length;
    if (len !== rhs.length) {
        return false;
    }

    for (let i = len - 1; i >= 0; --i) {
        // ignore this eslint duplicate warn
        if (!_equals(lhs[i], rhs[i])) {
            return false;
        }
    }
    return true;
};

const object_internal = (lhs, rhs) => {

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

const toPrimitive_call_internal = (a, toPrimitiveFunc, hint) => {
    try {
        const n = toPrimitiveFunc.call(a, hint);
        if (n !== null && n !== undefinedValue) {
            return n;
        }
    } catch (_) { 
        // ignore
    } 
    // return undefined
};

const toPrimitiveHints = ["number", "string", "default"];

const toPrimitive_internal = (a) => {
    const c = a[Symbol.toPrimitive];
    if (c) {
        for (const hint of toPrimitiveHints) {
            const e = toPrimitive_call_internal(a, c, hint);
            if (e !== undefinedValue) {
                return e;
            }
        }
    }
    // return undefined;
};

const toString_internal = (a) => Object.prototype.toString(a);

_equals = curry((lhs, rhs) => {
    if (lhs === rhs) {
        // undefined === undefined => true
        // null === null => true
        // 0 === 0 => true
        // Primitive types
        return true;
    }

    if (lhs === underBar || rhs === underBar) {
        //for pattern matching
        return true;
    } 

    if (lhs && rhs) {
        if (lhs.constructor !== rhs.constructor) {
            return false;
        }

        if (_isPrimitiveWrapper(lhs)) {
            return lhs.valueOf() === rhs.valueOf();
        }
        
        const lp = toPrimitive_internal(lhs);
        if (lp) {
            return lp === toPrimitive_internal(rhs);
        }

        if (lhs.valueOf() === rhs.valueOf()) {
            // extends PrimitiveWrapper
            return true;
        }
        
        if (lhs instanceof Array) {
            return array_internal(lhs, rhs);
        }

        if (_isTypedArray(lhs)) {
            return typedArray_internal(lhs, rhs);
        }

        if (_isObjectArray(lhs)) {
            return array_internal(lhs, rhs);
        }

        if (lhs instanceof Map) {
            return map_internal(lhs, rhs);
        }

        if (lhs instanceof Set) {
            return set_internal(lhs, rhs);
        }

        if (lhs instanceof RegExp) {
            return regExp_internal(lhs, rhs);
        }

        if (lhs instanceof Promise ||
            _isFunction(lhs)) {
            // :(
            return false;
        }

        if (toString_internal(lhs) !== toString_internal(rhs)) {
            return false;
        }

        return object_internal(lhs, rhs);
    } else {
        //NaN === NaN => false
        if (Number.isNaN(lhs) && Number.isNaN(rhs)) {
            return true;
        }
    }
    return false;
});

export const equals = _equals;
