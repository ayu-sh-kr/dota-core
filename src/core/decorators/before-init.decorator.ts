
function BeforeInitDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | any, descriptor: PropertyDescriptor) {
        let key: string = `${target.constructor.name}:Before`;
        let data: Map<string, Function>;

        if(!Reflect.getMetadata(key, target.constructor)) {
            data = new Map<string, Function>();
            Reflect.defineMetadata(key, data, target.constructor);
        }

        data = Reflect.getMetadata(key, target.constructor);
        data.set(propertyKey.toString(), descriptor.value);

        return descriptor;
    }
}

export { BeforeInitDecorator as BeforeInit }