import {HelperUtils} from "@dota/core/helper/helper.utils.ts";
import {ComponentConfig} from "@dota/core/types/core.types.ts";


export const bootstrap = (elements: CustomElementConstructor[]) => {
    elements.forEach(element => {
        const meta:ComponentConfig = HelperUtils.getComponentMetadata(element, 'Component');

        if(!customElements.get(meta.selector)) {
            customElements.define(meta.selector, element);
        }

    })
}