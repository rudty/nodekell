import * as runtime from "./internal/runtime";

let noneProxy;
const noneObject = () => noneProxy;
const nonHandler = {
    get: (_, key) => {
        switch(key) {
            case Symbol.toPrimitive: return runtime.returnZero;
            case "toString":
            case Symbol.toStringTag: return runtime.returnNilString;
            case Symbol.iterator: return runtime.returnEmptyIterator;
            case Symbol.asyncIterator: return runtime.returnEmptyAsyncIterator;
            case "constructor": return Object;
        }
        return noneProxy;
    },
    set: noneObject,
    ownKeys: () => [],
    has: () => false,
    defineProperty: noneObject,
};
noneProxy = new Proxy(noneObject, nonHandler);

const takeIfNext = (r, obj) => {
    if (r) {
        return obj;
    }
    return noneProxy;
};

/**
 * 
 * @param {Function} predicate if
 * @param {any} obj dist object
 * @return {Promise<any> | any} obj if predicate returns true, else empty proxy object
 */
export const takeIf = (predicate, obj) => {
    if (obj === noneProxy) {
        return noneProxy;
    }
    const r = predicate(obj);
    if (r instanceof Promise) {
        return r.then(e => takeIfNext(e, obj));
    }
    return takeIfNext(r, obj);
};