import {EventDetails} from "@dota/core/types/core.types.ts";


export function Event(): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const key = `${target.constructor.name}:Output`
        const event = `on${capitalize(propertyKey.toString())}`
        if (!Reflect.hasMetadata(key, target)) {
            console.log('No data')
            const data = new Map<string, EventDetails>()
            Reflect.defineMetadata(key, data, target.constructor);
        }

        const details: EventDetails = {eventName: event, propertyName: propertyKey.toString()}

        const data: Map<string, EventDetails> = Reflect.getMetadata(key, target.constructor);
        if (data) {
            data.set(propertyKey.toString(), details);
        }
    }
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}