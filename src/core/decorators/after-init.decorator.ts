import {HelperUtils} from "@dota/core/helper/helper.utils.ts";


function AfterInitDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        let data: Map<string, Function> = HelperUtils.fetchOrCreate<Function>(target, 'After');

        data.set(propertyKey.toString(), descriptor.value);

        return descriptor;
    }
}

export {AfterInitDecorator as AfterInit}
