
function BeforeInitDecorator(): MethodDecorator {
    return function (target: any, propertyKey: string | any, descriptor: PropertyDescriptor) {
        const originalConnectedCallback: Function = target.connectedCallback;
        const method: Function = descriptor.value;
        target.connectedCallback = function () {

            if(method) {
                method.apply(this)
            }

            if(originalConnectedCallback) {
                originalConnectedCallback.apply(this);
            }
        }
    }
}

export { BeforeInitDecorator as BeforeInit }