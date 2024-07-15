import {EventConfig, EventType} from "@dota/core/types/core.types.ts";


export function EventListener(config: EventConfig): MethodDecorator {

    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalConnectedCallback: Function = target.connectedCallback;

        target.connectedCallback = function () {
            if (originalConnectedCallback) {
                originalConnectedCallback.apply(this);
            }

            if(config.type === EventType.WINDOW) {
                window.addEventListener(config.name, descriptor.value.bind(this));
            } else if (config.type === EventType.ROOT) {
                this.addEventListener(config.name, descriptor.value.bind(this));
            }
        }

        const originalDisconnectedCallback = target.disconnectedCallback;

        target.disconnectedCallback = function () {

            if(config.type === EventType.WINDOW) {
                window.removeEventListener(config.name, descriptor.value.bind(this));
            } else if (config.type === EventType.ROOT) {
                this.removeEventListener(config.name, descriptor.value.bind(this));
            }

            if (originalDisconnectedCallback) {
                originalDisconnectedCallback.apply(this);
            }
        };

        return descriptor;
    }
}