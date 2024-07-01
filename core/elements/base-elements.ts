
export abstract class BaseElement extends HTMLElement {
    [key: string]: any

    isShadow: boolean = false;

    shadowRoot!: ShadowRoot

    protected constructor() {
        super();
    }

    connectedCallback() {

        if(this.isShadow){
            this.shadowRoot = this.attachShadow({mode: "open"})
        }

        if (this.isShadow) {
            console.log(this.shadowRoot)
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = this.render();
            }
        } else {
            this.innerHTML = this.render();
        }
    }

    abstract render(): string;

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {

        if (newValue !== oldValue) {
            this[name] = newValue;

            if (this.isShadow && this.shadowRoot) {
                this.shadowRoot.innerHTML = this.render();
            } else {
                this.innerHTML = this.render();
            }

        }
    }

    setAttribute(qualifiedName: string, value: string) {
        this[qualifiedName] = value;
        super.setAttribute(qualifiedName, value);
    }


}


export function Update(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (this: any, name: string, value: string) {
            originalMethod.call(this, name, value);
            this.connectedCallback();
        };

        return descriptor;
    };
}