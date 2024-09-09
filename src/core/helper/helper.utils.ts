import "reflect-metadata";
import {PropertyDetails} from "@dota/core/types";

export class HelperUtils {

    /**
     * Fetches existing metadata or creates new metadata for a given target and appender.
     *
     * This method retrieves metadata associated with the target's constructor using the specified appender.
     * If the metadata does not exist, it creates a new Map, defines it as metadata, and returns it.
     * If the metadata already exists, it simply returns the existing Map.
     *
     * @template T - The type of the metadata value.
     * @param {any} target - The target object to fetch or create metadata for.
     * @param {string} appender - The appender string used to construct the metadata key.
     * @returns {Map<string, T>} - The metadata Map associated with the target and appender.
     */
    static fetchOrCreate<T>(target: any, appender: string): Map<string, T> {

        const key =  `${target.constructor.name}:${appender}`

        let data: Map<string, T>;

        if(!Reflect.hasMetadata(key, target)) {
            data = new Map<string, T>();
            Reflect.defineMetadata(key, data, target);
        }

        data = Reflect.getMetadata(key, target);

        return data;
    }

    /**
     * Binds reactive properties to an element based on metadata.
     *
     * This function retrieves metadata associated with the element to find property details.
     * It then defines getter and setter methods for each property to enable reactivity.
     * When a property is set, the element's `updateHTML` method is called to re-render the component.
     *
     * @function bindReactive
     * @param {any} element - The element to bind reactive properties to.
     *
     * @example
     * // Assuming `element` is an instance of a class that extends `BaseElement`
     * bindReactive(element);
     *
     * // Now, when a property defined in the metadata is set, the element's `updateHTML` method will be called.
     * element.someProperty = 'newValue'; // This will trigger element.updateHTML()
     */
    static bindReactive(element: any ){
        let data = HelperUtils.fetchOrCreate<PropertyDetails>(element, 'Property');

        data.forEach((value: PropertyDetails) => {

            const propertyKey = `_${value.prototype}`

            Object.defineProperty(element, value.prototype, {
                get(): any {
                    return element[propertyKey]
                },

                set(v: any) {

                    if(element[propertyKey] !== v) {
                        element[propertyKey] = v;
                        element.setAttribute(value.name, v);
                    }
                },

                enumerable: true,
                configurable: true
            });
        });

        element.reactive = true;
    }


    /**
     * Extracts metadata for a given decorator from a class.
     *
     * @param {Function} targetClass - The class from which to extract metadata.
     * @param {string} decoratorName - The name of the decorator.
     * @returns {any} - The metadata associated with the specified decorator.
     */
    static getComponentMetadata(targetClass: Object, decoratorName: string): any {
        if(Reflect.hasOwnMetadata(decoratorName, targetClass)) {
            console.log(true)
        }
        return Reflect.getOwnMetadata(decoratorName, targetClass);
    }

}