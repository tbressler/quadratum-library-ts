/**
 * Interface for objects that can be used in a hash set (HashSet).
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export interface Hashable {

    /**
     * Returns a hash code value for the object. This method is supported for the benefit of
     * hash sets.
     *
     * @return A hash code value for this object.
     */
    hashCode(): number;

}

/**
 * A simple hash set.
 * This class wraps a Map from ES6 internally.
 *
 * @author Tobias Breßler
 * @version 1.0
 */
export class HashSet<T extends Hashable> {

    private internalMap = new Map<number, T>();

    public push(value: T) {
        this.internalMap.set(value.hashCode(), value);
    }

    public remove(value: T) {
        this.internalMap.delete(value.hashCode());
    }

    public contains(value: T): boolean {
        return this.internalMap.has(value.hashCode());
    }

    public forEach(callbackfn: (value: T) => void, thisArg?: any): void {
        return this.internalMap.forEach(callbackfn);
    }

    public values(): T[] {
        let result: T[] = [];
        this.internalMap.forEach(v => result.push(v));
        return result;
    }

    public clear(): void {
        this.internalMap.clear();
    }

    public size(): number {
        return this.internalMap.size;
    }

}