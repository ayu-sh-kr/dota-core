

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

        // Define the property with a getter and setter
        const getter = function (this: any) {
            return this.getAttribute(config.name);
        }

        const setter = function (this: any, neValue: any) {
            console.log(neValue)
            this.setAttribute(config.name, neValue);
        };

        // Delete property.
        if (delete target[propertyKey]) {
            // Create new property with getter and setter.
            Reflect.defineProperty(target, propertyKey, {
                get: getter,
                set: setter,
            });
        }

    }
}