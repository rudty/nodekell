
const defaultSize = 32;

/**
 * arraylist using native array
 * 
 * like template vector<int>
 * 
 * const int8arr = new _ArrayList(Int8Array); // ArrayList<Int8>
 * const int16arr = new _ArrayList(Int16Array); // ArrayList<Int16>
 * const int32arr = new _ArrayList(Int32Array); // ArrayList<Int32>
 * 
 * internal only
 */
export class _ArrayList {
    /**
     * native array constructor
     * support
     * 
     * Int8Array
     * Int16Array
     * Int32Array
     * 
     * Uint8ClampedArray
     * Uint8Array
     * Uint16Array
     * Uint32Array
     * 
     * @param {Function} ArrayCtor 
     */
    constructor(ArrayCtor) {
        const buf = new ArrayBuffer(ArrayCtor.BYTES_PER_ELEMENT * defaultSize);
        this._data = new (ArrayCtor)(buf);
        this._ctor = ArrayCtor;
        this._length = 0;
    }

    /**
     * [1,2]
     * grow(4)
     * [1,2,0,0] <- new 
     */
    _grow(size) {
        const byteSize = this._ctor.BYTES_PER_ELEMENT;
        const buf = new ArrayBuffer(size * byteSize);
        const newData = new (this._ctor)(buf);
        const oldData = this._data;

        //copy old elem
        for (let i = oldData.length - 1; i >= 0; --i) {
            newData[i] = oldData[i];
        }
        this._data = newData;
    }

    add(v) {
        const len = this._length;
        if (len === this._data.length) {
            this._grow(len * 2);
        }

        this._data[len] = v;
        this._length += 1;
    }

    /**
     * get
     * arr[i]
     * @param {number} i index
     */
    get(i) {
        return this._data[i];
    }

    /**
     * set
     * arr[i] = e;
     * @param {number} i index
     * @param {T} e elem
     */
    set(i, e) {
        this._data[i] = e;
    }

    /**
     * @returns {number} length
     */
    get length() {
        return this._length;
    }

    /**
     * not really clear
     * set the length 0 only
     */
    clear() {
        this._length = 0;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this._length; ++i) {
            yield this._data[i];
        }
    }

    toArray() {
        return this._data.slice(0, this._length);
    }
}