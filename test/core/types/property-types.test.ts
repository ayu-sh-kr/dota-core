import {Number, String, Boolean, Object, FunctionT} from "@src/core";


describe('StringType', () => {
    it('should convert a value to a string', () => {
        const value = 123;
        const result = String.process(value);
        expect(result).toBe('123')
    });

    it('should return the same string if the string value is already a string', () => {
        const value = "test";
        const result = String.process(value);
        expect(result).toBe('test')
    });

    it('should convert a boolean value to a string', () => {
        const value = true;
        const result = String.process(value);
        expect(result).toBe('true')
    });

    it('should throw an error if value cannot be converted to a string', () => {
        expect(() => String.process(null)).toThrow('Value is not of given type: null')
        expect(() => String.process(undefined)).toThrow('Value is not of given type: undefined')
    });


});

describe('NumberType', () => {

    it('should convert a string number to number type', () => {
        const value = "123";
        const result = Number.process(value);
        expect(result).toBe(123);
    });

    it('should not fail for converting a number as input', () => {
        const value = 123;
        const result = Number.process(value);
        expect(result).toBe(123)
    });

    it('should fail to convert a string to number', () => {
        const value = "test";
        expect(() => Number.process(value)).toThrow(`Value is not of type number: ${value}`)
    });

    it('should fail to convert a boolean to number', () => {
        const value = true;
        expect(() => Number.process(value)).toThrow(`Value is not of type number: ${value}`)
    });
});

describe('BooleanType', () => {

    it('should convert "true" to true', () => {
        const value = "true";
        const result = Boolean.process(value);
        expect(result).toBe(true);
    });

    it('should convert "false" to false', () => {
        const value = "false";
        const result = Boolean.process(value);
        expect(result).toBe(false);
    });

    it('should throw an error for non-boolean strings', () => {
        const value = "notABoolean";
        expect(() => Boolean.process(value)).toThrow('Value is not of type boolean: notABoolean');
    });

    it('should throw an error for non-string values', () => {
        const value = 123;
        expect(() => Boolean.process(value)).toThrow('Value is not of type boolean: 123');
    });
});

describe('ObjectType', () => {

    it('should convert a valid JSON string to an object', () => {
        const value = '{"key": "example", "value": 42}';
        const result = Object.process(value);
        expect(result).toEqual({ key: "example", value: 42 });
    });

    it('should throw an error for an invalid JSON string', () => {
        const value = 'invalid JSON string';
        expect(() => Object.process(value)).toThrow('Value is not of given type: invalid JSON string');
    });

    it('should throw an error for non-string values', () => {
        const value = 123;
        expect(() => Object.process(value)).toThrow('Value is not of given type: 123');
    });
});

describe('FunctionType', () => {

    it('should convert a valid function string to a function', () => {
        const value = '(x, y) => x + y;';
        const result = FunctionT.process(value);
        expect(result(1, 2)).toBe(3);
    });

    it('should throw an error for an invalid function string', () => {
        const value = 'invalid function string';
        expect(() => FunctionT.process(value)).toThrow('Value is not of given type: invalid function string');
    });

    it('should throw an error for non-string values', () => {
        const value = 123;
        expect(() => FunctionT.process(value)).toThrow('Value is not of given type: 123');
    });

    it('should check for other function too', () => {
        const value = "(str) => str"
        const result = FunctionT.process(value);
        expect(result("test")).toBe('test')
    });
});