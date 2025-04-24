import {ElementConfig, ElementConfigInternal, HelperUtils} from "@dota/core";

/**
 * A decorator that binds a property to a specified element configuration.
 *
 * This decorator allows you to specify an element configuration that will be used
 * to bind the decorated property to the element. The configuration includes the
 * selector name and type.
 *
 * @param {ElementConfig} config - The configuration for the element binding.
 * @returns {PropertyDecorator} - A property decorator function.
 *
 * @example
 * // Example of using ElementDecorator to bind a property to an element
 * class MyComponent {
 *   \@Element({ selector: 'div', type: 'tag' })
 *   public myProperty: string;
 * }
 *
 * // The myProperty will now be bound to the element with the specified configuration
 * // and can be used in the component's logic.
 *
 */
function ElementDecorator(config: ElementConfig): PropertyDecorator {
  return function (target, propertyKey) {
    const data = HelperUtils.fetchOrCreate<ElementConfigInternal>(target, 'Element');
    data.set(propertyKey.toString(), {
      ...config,
      property: propertyKey.toString(),
    })
  }
}

export {ElementDecorator as Element}