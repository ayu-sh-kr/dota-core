

export interface EventConfig {
    name: string;
    options?: EventListenerOptions
}



export function EventListener(config: EventConfig): MethodDecorator {

    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalConnectedCallback: Function = target.connectedCallback;

        target.connectedCallback = function () {
            if (originalConnectedCallback) {
                originalConnectedCallback.apply(this);
            }
            this.addEventListener(config.name, descriptor.value.bind(this))
        }

        const originalDisconnectedCallback = target.disconnectedCallback;

        target.disconnectedCallback = function () {
            this.removeEventListener(config.name, descriptor.value.bind(this));
            if (originalDisconnectedCallback) {
                originalDisconnectedCallback.apply(this);
            }
        };

        return descriptor;
    }
}