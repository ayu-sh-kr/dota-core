import {PropertyConfig, PropertyDetails} from "@dota/core/types/core.types.ts";


export function Property(config: PropertyConfig): PropertyDecorator{
    return function (target: any, propertyKey: string | symbol){

        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
        }

        target.constructor.observedAttributes.push(config.name)

        const key = `${target.constructor.name}:Property`

        let data!: Map<string, PropertyDetails>;

        if(!Reflect.getMetadata(key, target.constructor)) {
            data = new Map();
            Reflect.defineMetadata(key, data, target.constructor);
        }

        data = Reflect.getMetadata(key, target.constructor);
        data.set(
            config.name,
            {name: config.name, prototype: propertyKey.toString(), default: config.default}
        )
    }
}