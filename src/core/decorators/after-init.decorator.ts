

export function AfterInit(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {

        const originalConnectedCallback: Function = target.connectedCallback;
        const method: Function = descriptor.value;
        target.connectedCallback = function () {

            if(originalConnectedCallback) {
                originalConnectedCallback.apply(this);
            }

            if(method) {
                method.apply(this)
            }
        }
    }
}