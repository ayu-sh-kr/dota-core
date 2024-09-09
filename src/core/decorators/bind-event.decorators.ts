import {BindConfig} from "@dota/core/types";
import {HelperUtils} from "@dota/core/helper";


/**
 * A method decorator that binds an event to a method in a custom element.
 *
 * The `BindEventDecorator` function is used to bind an event to a method in a custom element.
 * It stores the event configuration details in a metadata store associated with the target class.
 * This allows the method to be invoked when the specified event is triggered.
 *
 * @param {BindConfig} config - The configuration object for the event binding.
 * @returns {MethodDecorator} - A method decorator function.
 *
 * @example
 * // Example of using BindEventDecorator to bind an event to a method in a custom element
 * class MyElement extends HTMLElement {
 *   \@BindEventDecorator({ event: 'click', selector: '#myButton' })
 *   public handleClick(event: Event) {
 *     console.log('Button clicked', event);
 *   }
 * }
 *
 * // The event is now bound to the method
 * const element = new MyElement();
 * document.body.appendChild(element);
 * // Clicking the button with id 'myButton' will trigger the handleClick method
 */
function BindEventDecorator(config: BindConfig): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let data = HelperUtils.fetchOrCreate<BindConfig>(target, 'Bind');
        data.set(propertyKey.toString(), config);

        return descriptor;
    }
}

export {BindEventDecorator as BindEvent}