import {BindConfig} from "@dota/core/types/core.types.ts";


export function BindEvent(config: BindConfig): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        let key: string = `${target.constructor.name}:Bind`;
        let data: Map<string, BindConfig>;

        if(!Reflect.getMetadata(key, target.constructor)) {
            data = new Map<string, BindConfig>();
            Reflect.defineMetadata(key, data, target.constructor);
        }

        data = Reflect.getMetadata(key, target.constructor);
        data.set(propertyKey.toString(), config);

        return descriptor;
    }
}