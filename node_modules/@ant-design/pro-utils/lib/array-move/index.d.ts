/**
 * @param  {ValueType[]} array
 * @param  {number} fromIndex
 * @param  {number} toIndex
 */
export declare function arrayMoveMutable<ValueType>(array: ValueType[], fromIndex: number, toIndex: number): void;
/**
 * @param  {T[]} array
 * @param  {number} fromIndex
 * @param  {number} toIndex
 * @returns T
 */
export declare function arrayMoveImmutable<T = string>({ array, fromIndex, toIndex, }: {
    array: T[];
    fromIndex: number;
    toIndex: number;
}): T[];
