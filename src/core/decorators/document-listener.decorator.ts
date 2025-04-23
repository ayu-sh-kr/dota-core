import {EventOptionMeta, EventOptions, HelperUtils} from "@dota/core";

/**
 * A method decorator that registers a method to listen for a specific event on a custom element.
 *
 * The `DocumentListenerDecorator` function is used to register a method that will be called when the specified
 * event is triggered on the document. It stores the event details in a metadata store associated with the target class.
 *
 * @param {EventOptions} option - The configuration object for the event binding.
 * @returns {MethodDecorator} - A method decorator function.
 *
 * @example
 * // Example of using DocumentListenerDecorator to register a method for an event
 * class MyElement extends HTMLElement {
 *   \@DocumentListenerDecorator({ event: 'click' })
 *   public handleClick(event: Event) {
 *     console.log('Document clicked', event);
 *   }
 * }
 *
 * // The handleClick method will be called when the document is clicked
 */
function DocumentListenerDecorator(option: EventOptions): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(target, "Document")
    data.set(propertyKey.toString(), {
      name: propertyKey.toString(),
      method: descriptor.value,
      event: option.event
    })
    return descriptor;
  }
}

export {DocumentListenerDecorator as DocumentListener}