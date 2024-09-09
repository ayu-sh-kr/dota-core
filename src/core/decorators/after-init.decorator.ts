import {HelperUtils} from "@dota/core/helper";


/**
 * A method decorator that registers a method to be called after the initialization of a custom element.
 *
 * The `AfterInitDecorator` function is used to register a method that will be called after the custom element
 * has been initialized. It stores the method details in a metadata store associated with the target class.
 *
 * @returns {MethodDecorator} - A method decorator function that registers the method for post-initialization.
 *
 * @example
 * // Example of using AfterInitDecorator to register a method for post-initialization
 * class MyElement extends HTMLElement {
 *   \@AfterInitDecorator()
 *   public afterViewInit() {
 *     console.log('Element initialized');
 *   }
 * }
 *
 * // The afterInit method will be called after the element is initialized
 * const element = new MyElement();
 * document.body.appendChild(element);
 */
function AfterInitDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let data: Map<string, Function> = HelperUtils.fetchOrCreate<Function>(target, 'After');

        data.set(propertyKey.toString(), descriptor.value);

        return descriptor;
    }
}

export {AfterInitDecorator as AfterInit}
