import {PropertyType} from "@dota/core/types/property.types.ts";


export class Sanitizer {

    /**
     * Sanitizes a given value based on the specified property type.
     *
     * This method processes the incoming value using the provided `PropertyType` to ensure
     * it conforms to the expected type. The `PropertyType` defines a `process` method that
     * handles the conversion or validation of the value.
     *
     * @param {any} newValue - The new value to be sanitized.
     * @param {PropertyType<any>} type - The property type used to process the value.
     * @returns {any} - The sanitized value, converted to the expected type.
     *
     * @example
     * // Assuming `NumberType` is a PropertyType that converts values to numbers
     * const sanitizedValue = Sanitizer.sanitize('123', NumberType);
     * console.log(sanitizedValue); // Output: 123
     *
     * @example
     * // Assuming `ObjectType` is a PropertyType that converts JSON strings to objects
     * interface ExampleObject {
     *     key: string;
     *     value: number;
     * }
     * const exampleObjectType = ObjectType<ExampleObject>();
     * const sanitizedObject = Sanitizer.sanitize('{"key": "example", "value": 42}', exampleObjectType);
     * console.log(sanitizedObject); // Output: { key: "example", value: 42 }
     */
    static sanitize(newValue: any, type: PropertyType<any>): any {
        return type.process(newValue);
    }
}