import {HelperUtils, ParameterConfig} from "@dota/core";


/**
 * A decorator function that defines a parameter for a custom element.
 *
 * The `ParamDecorator` function is used to define a parameter for a custom element,
 * including its configuration details such as the parameter name.
 *
 * @param {string} [name] - The name of the parameter. If not provided, it defaults to the property key.
 * @returns {PropertyDecorator} - A property decorator function.
 *
 * @example
 * // Example of using ParamDecorator to define a parameter on a custom element
 * class MyElement extends HTMLElement {
 *   \@Param('my-param')
 *   public myParam: string;
 * }
 *
 * // The parameter is now defined and can be used in the custom element
 */
function ParamDecorator(name?: string): PropertyDecorator {
  return function (target, propertyKey) {
    const data = HelperUtils.fetchOrCreate<ParameterConfig>(target, 'Param');

    const param = name ? name : propertyKey.toString();
    data.set(propertyKey.toString(), {name: param})
  }
}

export {ParamDecorator as Param}