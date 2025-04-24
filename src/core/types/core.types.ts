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
export interface ComponentConfig {
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
export interface MethodDetails {
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
export interface BindConfig {
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
export interface PropertyConfig {
  name: string;
  default?: string;
  type: PropertyType<any>
}


/**
 * Configuration details for Binding Component Level events through Event Listener decorator {@EventListner}
 * @prop {string} name - name of the event
 * @prop {EventListenerOptions} options - option for extra configuration (optional && not available at the moment)
 */
export interface EventConfig {
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
export interface PropertyDetails {
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
export enum EventType {
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
export interface EventDetails {
  eventName: string;
  propertyName: string;
}


/**
 * Configuration options for binding an event to a method.
 *
 * This interface defines the structure of the options object used to specify
 * the event type when binding an event to a method using decorators like `HostListener`.
 *
 * @interface EventOptions
 *
 * @property {string} event - The type of the event to bind to the method (e.g., 'click', 'mouseover').
 *
 * @example
 * // Example of using EventOptions with HostListenerDecorator
 * class MyComponent {
 *   \@HostListener({ event: 'click' })
 *   public handleClick(event: Event) {
 *     console.log('Host element clicked', event);
 *   }
 * }
 */
export interface EventOptions {
  event: string | string[]
}


/**
 * Configuration options for binding an event to a method.
 *
 * This interface defines the structure of the options object used to specify
 * the event type when binding an event to a method using decorators like `HostListener` or `WindowListener`.
 *
 * @interface EventOptions
 *
 * @property {string} event - The type of the event to bind to the method (e.g., 'click', 'mouseover').
 * @property {string} name - The name of the method to which event will be bounded.
 * @property {function} method - The method itself which is going to be bounded.
 */
export interface EventOptionMeta {
  event: string | string[],
  name: string
  method: Function
}


/**
 * Configuration options for binding a watcher to a method.
 *
 * This interface defines the structure of the options object used to specify
 * the property to watch and the method to call when the property changes.
 *
 * @interface WatcherOptionMeta
 *
 * @property {string | string[]} value - The name of the property or properties to watch.
 * This property specifies the name(s) of the property or properties that will trigger the watcher.
 *
 * @property {string} name - The name of the method to call when the property changes.
 * This property specifies the name of the method that will be called when the watched property changes.
 *
 * @property {function} method - The method itself which is going to be called when the property changes.
 * This property holds a reference to the actual method function that will be called.
 */
export interface WatcherOptionMeta {
  value: string | string[],
  name: string
  method: Function
}

/**
 * Type representing the different types of event bindings.
 *
 * This type defines the possible values for the type of event binding,
 * which can be 'Bind', 'Window', 'Host', or 'Document'.
 *
 * @type EventBindType
 */
export type EventBindType = 'Bind' | 'Window' | 'Host' | 'Document';

/**
 * Configuration object for binding events to methods.
 *
 * This interface defines the structure of the event binding record,
 * which includes the event options, the element to which the event is bound,
 * and the type of event binding (e.g., 'Bind', 'Window', 'Host').
 *
 * @interface EventBindRecord
 *
 * @property {EventOptionMeta} option - The options for the event binding.
 * This property specifies the configuration options for the event binding.
 *
 * @property {HTMLElement | Window | Document | ShadowRoot} element - The element to which the event is bound.
 * This property specifies the DOM element or global object to which the event listener will be attached.
 *
 * @property {EventBindType} type - The type of event binding (e.g., 'Bind', 'Window', 'Host').
 * This property specifies the type of event binding being used.
 */
export type EventBindRecord = {
  option: EventOptionMeta,
  element: HTMLElement | Window | Document | ShadowRoot,
  type: EventBindType
}

/**
 * Collection of event bindings for a component.
 *
 * This type represents a map where the keys are event types (e.g., 'click', 'input')
 * and the values are maps of event binding records. Each event binding record contains
 * the event options, the element to which the event is bound, and the type of event binding.
 *
 * @type EventBindCollection
 */
export type EventBindCollection = Map<EventBindType, Map<string, EventBindRecord>>;


/**
 * Configuration object for defining a parameter in a custom element.
 *
 * This interface defines the structure for storing parameter details that are used
 * by the `@Param` decorator to define parameters in custom elements. It includes
 * the name of the parameter.
 *
 * @interface ParameterConfig
 *
 * @property {string} name - The name of the parameter.
 * This property specifies the name of the parameter that is being defined.
 *
 * @example
 * // Example of using ParameterConfig to store parameter information
 * const paramConfig: ParameterConfig = {
 *     name: 'myParam'
 * };
 */
export interface ParameterConfig {
  name: string
}


/**
 * Configuration object for defining a state in a custom element.
 *
 * This interface defines the structure for storing state details that are used
 * by the `@State` decorator to define states in custom elements. It includes
 * the prototype of the state.
 *
 * @interface StateConfig
 *
 * @property {string} prototype - The prototype of the state.
 * This property specifies the prototype of the state that is being defined.
 *
 * @example
 * // Example of using StateConfig to store state information
 * const stateConfig: StateConfig = {
 *     prototype: 'myState'
 * };
 */
export interface StateConfig {
  prototype: string
}

/**
 * Configuration object for defining an element in a custom element.
 *
 * This interface defines the structure for storing element details that are used
 * by the `@Element` decorator to define elements in custom elements. It includes
 * the selector and the method of selecting the element (e.g., 'id', 'tag', 'class').
 *
 * @interface ElementConfig
 *
 * @property {string} selector - The selector for the element.
 * This property specifies the selector used to identify the element.
 *
 * @property {'id' | 'tag' | 'class'} by - The method of selecting the element.
 * This property specifies the method used to select the element (e.g., 'id', 'tag', 'class').
 *
 * @example
 * // Example of using ElementConfig to store element information
 * const elementConfig: ElementConfig = {
 *     selector: '#myElement',
 *     by: 'id'
 * };
 */
export interface ElementConfig {
  selector: string;
  by: 'id' | 'tag' | 'class'
}

/**
 * Configuration object for defining an element in a custom element.
 *
 * This interface defines the structure for storing element details that are used
 * by the `@Element` decorator to define elements in custom elements. It includes
 * the selector and the method of selecting the element (e.g., 'id', 'tag', 'class').
 *
 * @interface ElementConfigInternal
 *
 * @property {string} selector - The selector for the element.
 * This property specifies the selector used to identify the element.
 *
 * @property {'id' | 'tag' | 'class'} by - The method of selecting the element.
 * This property specifies the method used to select the element (e.g., 'id', 'tag', 'class').
 *
 * @property {string} property - The name of the property in the class.
 * This property specifies the name of the property in the class that corresponds to the element.
 *
 * @example
 * // Example of using ElementConfigInternal to store element information
 * const elementConfigInternal: ElementConfigInternal = {
 *     selector: '#myElement',
 *     by: 'id',
 *     property: 'myElementProperty'
 * };
 */
export interface ElementConfigInternal {
  selector: string;
  by: 'id' | 'tag' | 'class';
  property: string;
}