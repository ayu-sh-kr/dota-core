import {MethodDetails} from "@dota/core/types/core.types.ts";
import {HelperUtils} from "@dota/core/helper/helper.utils.ts";

export function Expose(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let data = HelperUtils.fetchOrCreate<MethodDetails>(target, 'Exposed')

        data.set(propertyKey.toString(), {name: propertyKey.toString(), method: descriptor.value});

        return descriptor;
    }
}