import {HelperUtils} from "@dota/core/helper/helper.utils.ts";


function BeforeInitDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | any, descriptor: PropertyDescriptor) {

        let data = HelperUtils.fetchOrCreate<Function>(target, 'Before');

        data.set(propertyKey.toString(), descriptor.value);

        return descriptor;
    }
}

export { BeforeInitDecorator as BeforeInit }