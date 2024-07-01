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

/**
 * Decorator for registering web components
 * @param config
 * @constructor
 */
export function Component(config: ComponentConfig): ClassDecorator{
    return function (target: any) {
        customElements.define(config.selector, target);
    }
}