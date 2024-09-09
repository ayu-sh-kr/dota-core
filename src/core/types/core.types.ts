import {PropertyType} from "@dota/core/types/property.types.ts";

/**
 * Configuration object for the Component decorator.
 *
 * This interface defines the configuration options for a component,
 * including the custom element name and whether the component should use a shadow root.
 *
 * @interface ComponentConfig
 *
 * @property {string} selector - The custom element name to define.
 * This property is required and specifies the name of the custom element.
 *
 * @property {boolean} [shadow=false] - Determines whether the component should use a shadow root.
 * This property is optional and defaults to `false`. If set to `true`, the component will use a shadow root.
 *
 * @example
 * // Example of using ComponentConfig to define a custom element with a shadow root
 * const config: ComponentConfig = {
 *     selector: 'my-custom-element',
 *     shadow: true
 * };
 *
 * @example
 * // Example of using ComponentConfig to define a custom element without a shadow root
 * const config: ComponentConfig = {
 *     selector: 'my-custom-element'
 * };
 */
interface ComponentConfig {
    selector: string;
    shadow?: boolean
}


/**
 * Configuration details of methods for Method Decorators.
 *
 * This interface defines the structure for storing method details
 * that are used by method decorators. It includes the name of the method
 * and the method itself.
 *
 * @interface MethodDetails
 *
 * @property {string} name - The name of the method.
 * This property specifies the name of the method that is being decorated.
 *
 * @property {Function} method - The method itself.
 * This property holds a reference to the actual method function.
 *
 * @example
 * // Example of using MethodDetails to store method information
 * const methodDetails: MethodDetails = {
 *     name: 'myMethod',
 *     method: function() {
 *         console.log('This is my method');
 *     }
 * };
 */
interface MethodDetails {
    name: string;
    method: Function
}


/**
 * Configuration details for binding element events to internal methods through the `BindEvent` decorator.
 *
 * This interface defines the structure for storing event binding details,
 * which are used by the `BindEvent` decorator to bind DOM events to component methods.
 *
 * @interface BindConfig
 *
 * @property {string} event - The name of the event to bind.
 * This property specifies the type of event (e.g., 'click', 'input') that will trigger the method.
 *
 * @property {string} id - The ID of the element to bind the event on.
 * This property specifies the DOM element's ID to which the event listener will be attached.
 *
 * @property {any[]} [params] - The parameters required by the method (optional).
 * This property allows specifying additional parameters that will be passed to the method when the event is triggered.
 *
 * @example
 * // Example of using BindConfig to bind a click event to a method with parameters
 * const bindConfig: BindConfig = {
 *     event: 'click',
 *     id: 'submitButton',
 *     params: ['param1', 'param2']
 * };
 */
interface BindConfig {
    event: string,
    id: string,
    params?: any[]
}


/**
 * Configuration details for binding a property with an attribute through the `@Property` decorator.
 *
 * This interface defines the structure for storing property binding details,
 * which are used by the `@Property` decorator to bind component properties to attributes.
 *
 * @interface PropertyConfig
 *
 * @property {string} name - The name of the attribute.
 * This property specifies the name of the attribute that will be bound to the component property.
 *
 * @property {string} [default] - The default value for the attribute (optional).
 * This property allows specifying a default value for the attribute if none is provided.
 *
 * @property {PropertyType<any>} type - The type of the property.
 * This property specifies the type of the property, ensuring that the value assigned to the attribute
 * is of the correct type.
 *
 * @example
 * // Example of using PropertyConfig to bind a property to an attribute with a default value
 * const propertyConfig: PropertyConfig = {
 *     name: 'myAttribute',
 *     default: 'defaultValue',
 *     type: String
 * };
 */
interface PropertyConfig {
    name: string;
    default?: string;
    type: PropertyType<any>
}


/**
 * Configuration details for Binding Component Level events through Event Listener decorator {@EventListner}
 * @prop {string} name - name of the event
 * @prop {EventListenerOptions} options - option for extra configuration (optional && not available at the moment)
 */
interface EventConfig {
    name: string;
    options?: EventListenerOptions;
    type: EventType
}


/**
 * Storage object for storing Property Details for binding property upon connectedCallback.
 *
 * This interface defines the structure for storing property details that are used to bind
 * component properties to attributes when the component is connected to the DOM. It includes
 * the attribute name, the property name in the class, the default value (if any), and the type
 * of the property.
 *
 * @interface PropertyDetails
 *
 * @property {string} name - The attribute name of the property.
 * This property specifies the name of the attribute that will be bound to the component property.
 *
 * @property {string} prototype - The property name in the class.
 * This property specifies the name of the property in the class that corresponds to the attribute.
 *
 * @property {any} [default] - The default value of the property (optional).
 * This property allows specifying a default value for the property if none is provided.
 *
 * @property {PropertyType<any>} type - The type of the property.
 * This property specifies the type of the property, ensuring that the value assigned to the attribute
 * is of the correct type.
 *
 * @example
 * // Example of using PropertyDetails to store property information
 * const propertyDetails: PropertyDetails = {
 *     name: 'myAttribute',
 *     prototype: 'myProperty',
 *     default: 'defaultValue',
 *     type: String
 * };
 */
interface PropertyDetails {
    name: string
    prototype: string
    default?: any,
    type: PropertyType<any>
}

/**
 * Enum representing the types of events that can be bound in the component.
 *
 * This enum defines the possible types of events that can be used in the component
 * for event binding. It includes two types: `WINDOW` and `ROOT`.
 *
 * @enum {number}
 * @property {number} WINDOW - Represents events that are bound to the global `window` object.
 * @property {number} ROOT - Represents events that are bound to the root element of the component.
 *
 * @example
 * // Example of using EventType to specify an event type
 * const eventType: EventType = EventType.WINDOW;
 */
enum EventType {
    WINDOW,
    ROOT
}

/**
 * Configuration details for event binding through the `@Event` decorator.
 *
 * This interface defines the structure for storing event details that are used
 * by the `@Event` decorator to bind component properties to custom events.
 *
 * @interface EventDetails
 *
 * @property {string} eventName - The name of the custom event.
 * This property specifies the name of the event that will be triggered.
 *
 * @property {string} propertyName - The name of the property in the class.
 * This property specifies the name of the property in the class that corresponds to the event.
 *
 * @example
 * // Example of using EventDetails to store event information
 * const eventDetails: EventDetails = {
 *     eventName: 'onMyEvent',
 *     propertyName: 'myEventProperty'
 * };
 */
interface EventDetails {
    eventName: string;
    propertyName: string;
}

export type {EventDetails, MethodDetails, PropertyDetails, PropertyConfig, ComponentConfig, BindConfig, EventConfig}
export {EventType}