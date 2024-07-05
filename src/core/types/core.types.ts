

/**
 * Configuration object for the Component decorator.
 *  @type {Object} ComponentConfig
 *  @prop {string} [selecter = ''] - The custom element name to define.
 *  @prop {boolean} [shadow = false] - Optional.
 *  Determines whether the component should use a shadow root.
 *  Defaults to false.
 */

export interface ComponentConfig {
    selector: string;
    shadow?: boolean
}

export interface MethodDetails {
    name: string;
    method: Function
}

export interface BindConfig {
    event: string,
    id: string,
    params?: any[]
}

export interface PropertyConfig {
    name: string;
    default?: string
}

export interface EventConfig {
    name: string;
    options?: EventListenerOptions
}

export interface PropertyDetails {
    name: string
    prototype: string
    default?: any
}