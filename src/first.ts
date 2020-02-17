export interface FirstType {
    /**
     * return a[0];
     */
    <T extends any[]>(a: T): T[0];
}
export const first: FirstType = (a: any) => a[0];
