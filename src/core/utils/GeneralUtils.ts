/**
 * A utility class providing general-purpose methods for common operations.
 */
export class GeneralUtils {

  /**
   * Converts the provided value into an array. If the value is already an array, it is returned as is.
   * Otherwise, the value is wrapped in an array.
   *
   * @param value - The value to be converted to an array. It can be a single value or an array.
   * @return An array containing the provided value, or the value itself if it was already an array.
   */
  static convertToArray<T>(value: T | T[]): T[] {
    return Array.isArray(value) ? value : [value];
  }
}