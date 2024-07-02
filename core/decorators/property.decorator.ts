

export interface PropertyConfig {
    name: string;
    default?: string
}

export function Property(config: PropertyConfig): PropertyDecorator{
    return function (target: any, propertyKey: string | symbol){


        if(!target.constructor.observedAttributes) {
            target.constructor.observedAttributes = [];
        }

        target.constructor.observedAttributes.push(config.name)

    }
}