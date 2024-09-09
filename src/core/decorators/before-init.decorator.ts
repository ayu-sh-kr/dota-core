import {HelperUtils} from "@dota/core/helper";

/**
 * A method decorator that registers a method to be called before the initialization of a custom element.
 *
 * The `BeforeInitDecorator` function is used to register a method that will be called before the custom element
 * has been initialized. It stores the method details in a metadata store associated with the target class.
 *
 * @returns {MethodDecorator} - A method decorator function that registers the method for pre-initialization.
 *
 * @example
 * // Example of using BeforeInitDecorator to register a method for pre-initialization
 * class MyElement extends HTMLElement {
 *   \@BeforeInitDecorator()
 *   public beforeViewInit() {
 *     console.log('Element will be initialized');
 *   }
 * }
 *
 * // The beforeInit method will be called before the element is initialized
 * const element = new MyElement();
 * document.body.appendChild(element);
 */
function BeforeInitDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | any, descriptor: PropertyDescriptor) {

        let data = HelperUtils.fetchOrCreate<Function>(target, 'Before');

        data.set(propertyKey.toString(), descriptor.value);

        return descriptor;
    }
}

export { BeforeInitDecorator as BeforeInit }