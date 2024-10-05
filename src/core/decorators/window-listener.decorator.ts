import {EventOptions, HelperUtils, EventOptionMeta} from "@src/core";


/**
 * \@WindowListener Decorator
 *
 * This decorator binds a method to a specified event on the global `window` object.
 * It is used to listen for events such as 'click', 'resize', 'scroll', etc., and
 * execute the decorated method when the event is triggered.
 *
 * @param {EventOptions} config - Configuration options for the event listener.
 * @param {string | string[]} config.event - The type of the event to bind to the method (e.g., 'click', 'resize').
 *
 * @returns {MethodDecorator} - A method decorator that binds the specified event to the method.
 *
 * @example
 * // Example usage of the WindowListener decorator
 * class MyComponent {
 *   \@WindowListener({ event: 'resize' })
 *   public onResize(event: Event) {
 *     console.log('Window resized', event);
 *   }
 * }
 */
function WindowListenerDecorator(config: EventOptions): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const data = HelperUtils.fetchOrCreate<EventOptionMeta>(target, "Window")
        data.set(propertyKey.toString(), {
            name: propertyKey.toString(),
            method: descriptor.value,
            event: config.event
        })
    }
}

export {WindowListenerDecorator as WindowListener}