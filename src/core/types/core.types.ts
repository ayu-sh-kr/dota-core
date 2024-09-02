/**
 * Configuration object for the Component decorator.
 *  @type {Object} ComponentConfig
 *  @prop {string} [selecter = ''] - The custom element name to define.
 *  @prop {boolean} [shadow = false] - Optional.
 *  Determines whether the component should use a shadow root.
 *  Defaults to false.
 */
import {PropertyType} from "@dota/core/types/property.types.ts";


export interface ComponentConfig {
    selector: string;
    shadow?: boolean
}


/**
 * Configuration details of methods for Method Decorators
 * @type {Object} MethodDetails
 * @prop {string} name - name of the method
 * @prop {Function} method - method itself
 */
export interface MethodDetails {
    name: string;
    method: Function
}


/**
 * Configuration details for Binding Element Events to internal methods through BindEvent decorator {@BindEvents}
 * @type{Object}
 * @prop {string} event - name of the event
 * @prop {string} id - id of the element to bind event on
 * @prop {string} params - params required by the method (optional)
 */
export interface BindConfig {
    event: string,
    id: string,
    params?: any[]
}


/**
 * Configuration details for Binding Property with Attribute through Property decorator {@Property}
 * @prop {string} name - name of the attribute
 * @prop {string} default - default value for attribute
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
 * Storage object for storing Property Details for binding property upon connectedCallback
 * @prop {string} name - attribute name of property
 * @prop {string} prototype - property name in the class
 * @prop {default} default - default value of the property (optional)
 */
export interface PropertyDetails {
    name: string
    prototype: string
    default?: any,
    type: PropertyType<any>
}

export enum EventType {
    WINDOW, ROOT
}

export interface EventDetails {
    eventName: string
    propertyName: string
}