import {EventDetails} from "@dota/core/types/core.types.ts";
import {HelperUtils} from "@dota/core/helper/helper.utils.ts";


export function EventDecorator(): PropertyDecorator {
    return function (target: any, propertyKey: string | symbol) {

        let data = HelperUtils.fetchOrCreate<EventDetails>(target, 'Output')

        const event = `on${capitalize(propertyKey.toString())}`

        const details: EventDetails = {eventName: event, propertyName: propertyKey.toString()}

        data.set(propertyKey.toString(), details);
    }
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export {EventDecorator as Event}