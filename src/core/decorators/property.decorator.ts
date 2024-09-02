import {PropertyConfig, PropertyDetails} from "@dota/core/types/core.types.ts";
import {HelperUtils} from "@dota/core/helper/helper.utils.ts";


export function Property(config: PropertyConfig): PropertyDecorator{
    return function (target: any, propertyKey: string | symbol){

        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
        }

        target.constructor.observedAttributes.push(config.name);

        let data = HelperUtils.fetchOrCreate<PropertyDetails>(target, 'Property');

        data.set(
            config.name,
            {name: config.name, prototype: propertyKey.toString(), default: config.default, type: config.type}
        )
    }
}