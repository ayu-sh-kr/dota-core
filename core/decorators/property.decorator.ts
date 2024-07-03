import {PropertyConfig} from "@dota/types/core.types.ts";


export function Property(config: PropertyConfig): PropertyDecorator{
    return function (target: any, propertyKey: string | symbol){


        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
        }

        target.constructor.observedAttributes.push(config.name)

    }
}