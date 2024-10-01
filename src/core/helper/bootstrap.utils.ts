import {ComponentConfig} from "@dota/core/types";
import {HelperUtils} from "@dota/core/helper";


/**
 * Bootstraps custom elements by defining them with the custom elements' registry.
 *
 * The `bootstrap` function takes an array of custom element constructors and registers them
 * with the custom elements' registry. It retrieves the component metadata using `HelperUtils.getComponentMetadata`
 * and defines the custom element if it is not already defined.
 *
 * @param {CustomElementConstructor[]} elements - An array of custom element constructors to be registered.
 *
 * @example
 * // Example of using bootstrap to register custom elements
 * import { MyElement } from './my-element';
 * import { AnotherElement } from './another-element';
 *
 * bootstrap([MyElement, AnotherElement]);
 *
 * // The custom elements are now registered and can be used in the DOM
 * const myElement = document.createElement('my-element');
 * document.body.appendChild(myElement);
 */
export const bootstrap = (elements: CustomElementConstructor[]) => {
    elements.forEach(element => {
        const meta:ComponentConfig = HelperUtils.getComponentMetadata(element, 'Component');

        if(!customElements.get(meta.selector)) {
            customElements.define(meta.selector, element);
        }

    })
}