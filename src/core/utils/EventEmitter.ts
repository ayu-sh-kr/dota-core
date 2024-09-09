
/**
 * A class that provides a simple event emitting mechanism.
 *
 * The `EventEmitter` class allows you to create custom events and dispatch them
 * to either a specified root element or the global window object. The events
 * are created with a specified name and can carry data of type `T`.
 *
 * @template T - The type of data that the event will carry.
 */
export class EventEmitter<T> {

    /**
     * Creates an instance of `EventEmitter`.
     *
     * @param {string} name - The name of the event to be emitted.
     */
    constructor(private name: string) {
    }


    /**
     * Emits an event with the specified data.
     *
     * This method creates a `CustomEvent` with the provided data and dispatches it.
     * If a root element is specified, the event is dispatched from that element.
     * Otherwise, the event is dispatched from the global window object.
     *
     * @param {T} data - The data to be included in the event's detail.
     * @param {HTMLElement} [root] - The root element from which to dispatch the event. If not provided, the event is dispatched from the window.
     */
    emit(data: T, root?: HTMLElement) {
        const event = new CustomEvent<T>(this.name, {
            bubbles: true,
            detail: data
        })

        if(root) {
            root.dispatchEvent(event);
        }
        else window.dispatchEvent(event);
    }
}