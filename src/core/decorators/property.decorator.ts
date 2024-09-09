import {PropertyConfig, PropertyDetails} from "@dota/core/types";
import {HelperUtils} from "@dota/core/helper";


/**
 * A decorator function that defines a property on a custom element.
 *
 * The `PropertyDecorator` function is used to define a property on a custom element,
 * including its configuration details such as the attribute name, default value, and type.
 * It also ensures that the property is observed for changes.
 *
 * @param {PropertyConfig} config - The configuration object for the property.
 * @returns {PropertyDecorator} - A property decorator function.
 *
 * @example
 * // Example of using PropertyDecorator to define a property on a custom element
 * class MyElement extends HTMLElement {
 *   \@PropertyDecorator({ name: 'my-property', default: 'default value', type: String })
 *   public myProperty: string;
 * }
 *
 * // The property is now defined and observed for changes
 * const element = new MyElement();
 * element.myProperty = 'new value';
 * console.log(element.myProperty); // Output: 'new value'
 */
function PropertyDecorator(config: PropertyConfig): PropertyDecorator{
    return function (target: any, propertyKey: string | symbol){

        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
        }

        target.constructor.observedAttributes.push(config.name);

        let data = HelperUtils.fetchOrCreate<PropertyDetails>(target, 'Property');

        data.set(
            config.name,
            {name: config.name, prototype: propertyKey.toString(), default: config.default, type: config.type}
        )
    }
}

export {PropertyDecorator as Property}