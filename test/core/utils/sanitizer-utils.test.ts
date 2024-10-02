import {Boolean, FunctionT, Number, Object, Sanitizer, String} from "@src/core";


describe('Sanitizer Utils', () => {

    it('should convert the value provided the PropertyType', () => {
        const value = Sanitizer.sanitize("Hello", String);
        expect(value).toBe("Hello")
    });

    it('should convert boolean given the PropertyType', () => {
        const value = Sanitizer.sanitize("true", Boolean);
        expect(value).toBe(true)
    });

    it('should convert the number given the PropertyType', () => {
        const value = Sanitizer.sanitize("10", Number);
        expect(value).toBe(10)
    });

    it('should convert the object given the PropertyType', () => {
        const obj = '{"key": "value"}'
        const value = Sanitizer.sanitize(obj, Object);
        expect(value).toEqual({key: 'value'})
    });

    it('should handle empty object for Object type', () => {
        const value = Sanitizer.sanitize("{}", Object);
        expect(value).toEqual({});
    });

    it('should sanitize a function given the PropertyType', () => {
        const funcString = '(x, y) => x + y';
        const sanitizedFunc = Sanitizer.sanitize(funcString, FunctionT);
        expect(sanitizedFunc(1, 2)).toBe(3);
    });

    it('should throw an error for an invalid function string', () => {
        const invalidFuncString = 'invalid function string';
        expect(() => Sanitizer.sanitize(invalidFuncString, FunctionT)).toThrow('Value is not of given type: invalid function string');
    });

    it('should throw an error for non-string values', () => {
        const nonStringValue = 123;
        expect(() => Sanitizer.sanitize(nonStringValue, FunctionT)).toThrow('Value is not of given type: 123');
    });
});