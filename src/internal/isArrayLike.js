/**
 * is array like object
 * if not an Array, must have at least one element
 * @param {ArrayLike} any 
 */
export const _isArrayLike = (a) => {
    if (Array.isArray(a)) {
        return true;
    }
    
    const len = a.length;
    return (Number.isInteger(len) && len > 0 && (len - 1) in a);
};