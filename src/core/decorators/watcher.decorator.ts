import {HelperUtils, WatcherOptionMeta} from "@dota/core";
import {GeneralUtils} from "@dota/core/utils/GeneralUtils.ts";

/**
 * Creates a method decorator that registers the decorated method as a watcher for one or more properties.
 *
 * This decorator only works for properties that have been decorated with \@Property. It converts the provided
 * property or array of properties to an array, then retrieves or creates metadata for each property using a unique
 * key in the form \`Watcher:<property>\`. It stores the method along with its name and the watched property's value.
 *
 * @param {string | string[]} value - The property name or list of property names (should be decorated with \@Property) to watch.
 * @returns {MethodDecorator} - The method decorator function.
 *
 * @example
 * // Example usage in a component class:
 * import { Watcher, Property } from '@ayu-sh-kr/dota-core';
 *
 * class MyComponent {
 *     \@Property({
 *         name: "myProp",
 *         type: "String",
 *     })
 *     myProp: string = "";
 *
 *     \@Watcher("myProp")
 *     onMyPropChange(newValue: any) {
 *         console.log("Watcher triggered: myProp changed to " + newValue);
 *     }
 * }
 */
function WatcherDecorator(value: string | string[]): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        if(value) {
            const properties = GeneralUtils.convertToArray(value);
            properties.forEach(property => {
                const data = HelperUtils.fetchOrCreate<WatcherOptionMeta>(target, `Watcher:${property}`);
                data.set(propertyKey.toString(), {
                    name: propertyKey.toString(),
                    method: descriptor.value,
                    value: property
                });
            })
        }

        return descriptor;
    }
}

export {WatcherDecorator as Watcher}