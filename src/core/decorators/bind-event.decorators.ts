import {BindConfig} from "@dota/core/types/core.types.ts";
import {HelperUtils} from "@dota/core/helper/helper.utils.ts";


export function BindEvent(config: BindConfig): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let data = HelperUtils.fetchOrCreate<BindConfig>(target, 'Bind');
        data.set(propertyKey.toString(), config);

        return descriptor;
    }
}