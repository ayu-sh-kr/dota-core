
export class GeneralUtils {
    static convertToArray<T>(value: T | T[]): T[] {
        return Array.isArray(value) ? value : [value];
    }
}