import {OutputDetails} from "@dota/core/types/core.types.ts";


export function Output(): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const key = `${target.constructor.name}:Output`
        const event = `on${capitalize(propertyKey.toString())}Change`
        if (!Reflect.hasMetadata(key, target)) {
            console.log('No data')
            const data = new Map<string, OutputDetails>()
            Reflect.defineMetadata(key, data, target.constructor);
        }

        const details: OutputDetails = {eventName: event, propertyName: propertyKey.toString()}

        const data: Map<string, OutputDetails> = Reflect.getMetadata(key, target.constructor);
        if (data) {
            data.set(propertyKey.toString(), details);
        }
    }
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}