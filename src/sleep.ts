export interface Sleep {
    /**
     * sleep
     * @param t milliseconds
     */
    (t: number): Promise<void>;
}

export const sleep: Sleep = (t: number): Promise<void> => new Promise((r) => {
    setTimeout(r, t);
});
