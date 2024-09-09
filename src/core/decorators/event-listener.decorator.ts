import {EventConfig, EventType} from "@dota/core/types";


/**
 * A method decorator that adds event listeners to a custom element.
 *
 * The `EventListenerDecorator` function is used to add event listeners to a custom element.
 * It supports adding listeners to either the global window object or the element itself.
 * The decorator ensures that the event listeners are properly added and removed when the element
 * is connected to or disconnected from the DOM.
 *
 * @param {EventConfig} config - The configuration object for the event listener.
 * @returns {MethodDecorator} - A method decorator function.
 *
 * @example
 * // Example of using EventListenerDecorator to add an event listener to a custom element
 * class MyElement extends HTMLElement {
 *   \@EventListenerDecorator({ name: 'click', type: EventType.ROOT })
 *   public handleClick(event: Event) {
 *     console.log('Element clicked', event);
 *   }
 * }
 *
 * // The event listener is now added to the element
 * const element = new MyElement();
 * document.body.appendChild(element);
 * // Clicking the element will trigger the handleClick method
 */
function EventListenerDecorator(config: EventConfig): MethodDecorator {

    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalConnectedCallback: Function = target.connectedCallback;

        target.connectedCallback = function () {
            if (originalConnectedCallback) {
                originalConnectedCallback.apply(this);
            }

            if(config.type === EventType.WINDOW) {
                window.addEventListener(config.name, descriptor.value.bind(this));
            } else if (config.type === EventType.ROOT) {
                this.addEventListener(config.name, descriptor.value.bind(this));
            }
        }

        const originalDisconnectedCallback = target.disconnectedCallback;

        target.disconnectedCallback = function () {

            if(config.type === EventType.WINDOW) {
                window.removeEventListener(config.name, descriptor.value.bind(this));
            } else if (config.type === EventType.ROOT) {
                this.removeEventListener(config.name, descriptor.value.bind(this));
            }

            if (originalDisconnectedCallback) {
                originalDisconnectedCallback.apply(this);
            }
        };

        return descriptor;
    }
}

export {EventListenerDecorator as EventListener}