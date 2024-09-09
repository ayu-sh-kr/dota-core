import {HelperUtils} from "@dota/core/helper";
import {MethodDetails} from "@dota/core/types";

/**
 * A method decorator that exposes the decorated method for external access.
 *
 * The `ExposeDecorator` decorator is used to mark a method as exposed, allowing it to be accessed
 * externally. It stores the method details in a metadata store associated with the target class.
 *
 * @returns {MethodDecorator} - A method decorator function that marks the method as exposed.
 *
 * @example
 * // Example of using the Expose decorator to expose a method
 * class MyClass {
 *   \@Expose()
 *   public myMethod() {
 *     console.log('This method is exposed');
 *   }
 * }
 *
 * // The exposed method can now be accessed externally
 * const instance = new MyClass();
 * instance.myMethod(); // Output: This method is exposed
 */
function ExposeDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let data = HelperUtils.fetchOrCreate<MethodDetails>(target, 'Exposed')

        data.set(propertyKey.toString(), {name: propertyKey.toString(), method: descriptor.value});

        return descriptor;
    }
}

export {ExposeDecorator as Expose}