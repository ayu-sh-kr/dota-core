import {EventOptions, HelperUtils, EventOptionMeta} from "@dota/core";


/**
 * A decorator that binds a method to a specified event on the host element.
 *
 * This decorator allows you to specify an event that will trigger the decorated method
 * when it occurs on the host element. The event options include the event type.
 *
 * @param {EventOptions} options - The options for the event binding, including the event type.
 * @returns {MethodDecorator} - A method decorator function.
 *
 * @example
 * // Example of using HostListenerDecorator to bind a click event to a method
 * class MyComponent {
 *   \@HostListener({ event: 'click' })
 *   public handleClick(event: Event) {
 *     console.log('Host element clicked', event);
 *   }
 * }
 *
 * // The click event on the host element will now trigger the handleClick method
 */
function HostListenerDecorator(options: EventOptions): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const data = HelperUtils.fetchOrCreate<EventOptionMeta>(target, 'Host')
        data.set(propertyKey.toString(), {
            event: options.event,
            name: propertyKey.toString(),
            method: descriptor.value
        });

        return descriptor;
    }
}




export {HostListenerDecorator as HostListener}

