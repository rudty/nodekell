
const emptyHandler = {

};

const takeIfNext = (r, obj) => {
    if (r) {
        return obj;
    }
    return new Proxy(obj, emptyHandler);
};

/**
 * 
 * @param {Function} predicate if
 * @param {any} obj dist object
 * @return {Promise<?>} obj if predicate returns true, else empty proxy object
 */
const takeIf = (predicate, obj) => {
    const r = predicate(obj);
    if (r instanceof Promise) {
        return r.then(e => takeIfNext(e, obj));
    }
    return takeIfNext(r, obj);
};