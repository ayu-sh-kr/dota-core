import {ComponentConfig, MethodDetails} from "@dota/core/types/core.types.ts";
import 'reflect-metadata'


/**
 * Decorator for registering web components
 * @param config
 * @constructor
 */
export function Component(config: ComponentConfig) {
    return function (target: any) {

        /* Get the names of the methods in the target class */
        const methodNames = Object.getOwnPropertyNames(target.prototype)
            .filter(prop => typeof target.prototype[prop] === 'function' && prop !== 'constructor');

        /**
         *  @Create an array of MethodDetails objects
         *
         */
        const methods: MethodDetails[] = methodNames.map(name => ({
            name: name,
            method: target.prototype[name],
        }));

        /**
         *  @Store the methods in the metadata
         */
        Reflect.defineMetadata(target.name, methods, target);

        /**
         *  @Register the Component
         */
        if (!customElements.get(config.selector)) {
            customElements.define(config.selector, target);
        }

        Reflect.defineMetadata(target.name + ':' + 'shadow', config.shadow, target);
    }
}