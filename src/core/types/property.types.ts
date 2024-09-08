
/**
 * Represents a type that processes a value into a specific type `T`.
 *
 * This generic type is used to define a structure for processing values into a desired type.
 * It includes a `process` method that takes any value and converts it to the type `T`.
 *
 * @template T - The type to which the value will be processed.
 *
 * @property {function(any): T} process - A method that takes any value and converts it to the type `T`.
 *
 * @example
 * // Example of a PropertyType that converts values to strings
 * const StringType: PropertyType<string> = {
 *     process: (value: any) => String(value)
 * };
 *
 * @example
 * // Example of a PropertyType that converts values to numbers
 * const NumberType: PropertyType<number> = {
 *     process: (value: any) => Number(value)
 * };
 *
 * @example
 * // Example of a PropertyType that converts JSON strings to objects
 * interface ExampleObject {
 *     key: string;
 *     value: number;
 * }
 * const ObjectType = <T>(): PropertyType<T> => ({
 *     process: (value: any): T => {
 *         try {
 *             return JSON.parse(value) as T;
 *         } catch (e) {
 *             throw new Error(`Value is not of given type: ${value}`);
 *         }
 *     }
 * });
 */
export type PropertyType<T> = {
    process: (value: any) => T;
}


/**
 * A `PropertyType` that processes a value into a string.
 *
 * This constant defines a `PropertyType` for strings, which includes a `process` method
 * that takes any value and converts it to a string. If the conversion fails, an error is thrown.
 *
 * @type {PropertyType<string>}
 *
 * @property {function(any): string} process - A method that takes any value and converts it to a string.
 *
 * @throws {Error} If the value cannot be converted to a string.
 *
 * @example
 * // Example of using StringType to process a value
 * const stringValue = StringType.process(123);
 * console.log(stringValue); // Output: "123"
 *
 * @example
 * // Example of handling an error when the value cannot be converted to a string
 * try {
 *     const invalidStringValue = StringType.process(undefined);
 * } catch (e) {
 *     console.error(e.message); // Output: Value is not of type string: undefined
 * }
 */
const StringType: PropertyType<string> = {
    process: (value: any) => {
        try {
            return String(value)
        } catch (e) {
            throw new Error(`Value is not of type string: ${value}`)
        }
    }
}

/**
 * A `PropertyType` that processes a value into a number.
 *
 * This constant defines a `PropertyType` for numbers, which includes a `process` method
 * that takes any value and converts it to a number. If the conversion fails, an error is thrown.
 *
 * @type {PropertyType<number>}
 *
 * @property {function(any): number} process - A method that takes any value and converts it to a number.
 *
 * @throws {Error} If the value cannot be converted to a number.
 *
 * @example
 * // Example of using NumberType to process a value
 * const numberValue = NumberType.process('123');
 * console.log(numberValue); // Output: 123
 *
 * @example
 * // Example of handling an error when the value cannot be converted to a number
 * try {
 *     const invalidNumberValue = NumberType.process('abc');
 * } catch (e) {
 *     console.error(e.message); // Output: Value is not of type number: abc
 * }
 */
const NumberType: PropertyType<number> = {
    process: (value: any) => {
        try {
            return Number(value);
        }catch (e) {
            throw new Error(`Value is not of type number: ${value}`)
        }
    }
}

/**
 * A `PropertyType` that processes a value into a boolean.
 *
 * This constant defines a `PropertyType` for booleans, which includes a `process` method
 * that takes any value and converts it to a boolean. If the conversion fails, an error is thrown.
 *
 * @type {PropertyType<boolean>}
 *
 * @property {function(any): boolean} process - A method that takes any value and converts it to a boolean.
 *
 * @throws {Error} If the value cannot be converted to a boolean.
 *
 * @example
 * // Example of using BooleanType to process a value
 * const booleanValue = BooleanType.process('true');
 * console.log(booleanValue); // Output: true
 *
 * @example
 * // Example of handling an error when the value cannot be converted to a boolean
 * try {
 *     const invalidBooleanValue = BooleanType.process('notABoolean');
 * } catch (e) {
 *     console.error(e.message); // Output: Value is not of type boolean: notABoolean
 * }
 */
const BooleanType: PropertyType<boolean> = {
    process: (value: any) => {
        try {
            if(value === "false") {
                return false;
            } else if(value === "true") {
                return true;
            }
            throw new Error(`Not a boolean type -> value: ${value}`);
        }catch (e) {
            throw new Error(`Value is not of type boolean: ${value}`)
        }
    }
}

/**
 * A `PropertyType` that processes a value into an object of type `T`.
 *
 * This constant defines a `PropertyType` for objects, which includes a `process` method
 * that takes any value and converts it to an object of type `T`. If the conversion fails,
 * an error is thrown.
 *
 * @template T - The type of the object to which the value will be processed.
 *
 * @type {PropertyType<object>}
 *
 * @property {function(any): object} process - A method that takes any value and converts it to an object of type `T`.
 *
 * @throws {Error} If the value cannot be converted to an object of type `T`.
 *
 * @example
 * // Example of using ObjectType to process a JSON string into an object
 * interface ExampleObject {
 *     key: string;
 *     value: number;
 * }
 * const exampleObjectType = ObjectType<ExampleObject>();
 * const objectValue = exampleObjectType.process('{"key": "example", "value": 42}');
 * console.log(objectValue); // Output: { key: "example", value: 42 }
 *
 * @example
 * // Example of handling an error when the value cannot be converted to an object
 * try {
 *     const invalidObjectValue = ObjectType<ExampleObject>().process('invalid JSON string');
 * } catch (e) {
 *     console.error(e.message); // Output: Value is not of given type: invalid JSON string
 * }
 */
const ObjectType: PropertyType<object> = {
    process: (value: any) => {
        try {
            return Object(JSON.parse(value))
        }catch (e) {
            throw new Error(`Value is not of given type: ${value}`)
        }
    }
}

export {StringType as String, NumberType as Number, BooleanType as Boolean, ObjectType as Object}