import {MethodDetails} from "@dota/types/core.types.ts";

export function Expose(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let key: string = `${target.constructor.name}:Exposed`;

        let data = new Map<string, MethodDetails>();

        if(!Reflect.getMetadata(key, target.constructor)) {
            Reflect.defineMetadata(key, data, target.constructor);
        }

        data = Reflect.getMetadata(key, target.constructor);
        data.set(propertyKey.toString(), {name: propertyKey.toString(), method: descriptor.value});

        return descriptor;
    }
}