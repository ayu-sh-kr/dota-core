import {BindConfig, MethodDetails} from "@dota/types/core.types.ts";

export abstract class BaseElement extends HTMLElement {
    [key: string]: any

    isShadow!: boolean;

    shadowRoot!: ShadowRoot

    protected constructor() {
        super();
    }

    connectedCallback() {

        this.exposeMethods();

        let methods: MethodDetails[] = Reflect.getMetadata(this.constructor.name, this.constructor);

        this.isShadow = Reflect.getMetadata(this.constructor.name + ':' + 'shadow', this.constructor)

        if(this.isShadow){
            this.shadowRoot = this.attachShadow({mode: "open"})
        }

        if (this.isShadow) {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = this.render();
                this.bindEvents(this, methods);
            }
        } else {
            this.innerHTML = this.render();
            this.bindEvents(this, methods);
        }
        this.bindMethods();
    }

    abstract render(): string;

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {

        let methods: MethodDetails[] = Reflect.getMetadata(this.constructor.name, this.constructor);

        if (newValue !== oldValue) {
            this[name] = newValue;
            if (this.isShadow && this.shadowRoot) {
                this.shadowRoot.innerHTML = this.render();
                this.bindEvents(this.shadowRoot, methods)
            } else {
                this.innerHTML = this.render();
                this.bindEvents(this, methods)
            }
        }
        this.bindMethods();
    }

    setAttribute(qualifiedName: string, value: string) {
        this[qualifiedName] = value;
        super.setAttribute(qualifiedName, value);
    }


    bindEvents(root: HTMLElement | ShadowRoot, methods: MethodDetails[]) {

        const eventPattern = /@(\w+)="{(\w+)}"/g;
        
        for (const match of root.innerHTML.matchAll(eventPattern)) {
            const eventName = match[1];
            const methodName = match[2];
            const methodDetail = methods.find(m => m.name === methodName);

            if (methodDetail) {
                const elements = root.querySelectorAll(`[\\@${eventName}="{${methodName}}"]`);
                elements.forEach(element => {
                    element.addEventListener(eventName, methodDetail.method.bind(this));
                });
            }
        }
    }

    bindMethods() {
        let key = `${this.constructor.name}:Bind`
        let data: Map<string, BindConfig> = Reflect.getMetadata(key, this.constructor);
        if(data) {
            data.forEach((config, methodName) => {
                const element = this.querySelector(config.id);
                if (element) {
                    const method = this[methodName];
                    if (config.params) {
                        // If params are provided, create a wrapper function to include them.
                        const boundMethodWithParams = (...args: any[]) => method.apply(this, [...config.params!, ...args]);
                        element.addEventListener(config.event, boundMethodWithParams);
                    } else {
                        // If no params are provided, bind the method directly.
                        element.addEventListener(config.event, method.bind(this));
                    }
                }
            });
        }
    }

    exposeMethods() {
        let data: Map<string, MethodDetails> = Reflect.getMetadata(`${this.constructor.name}:Exposed`, this.constructor);

        if(data) {
            data.forEach((value, key)  => {
                if (typeof window !== "undefined") {
                    if(!(window as any)[key]) {
                        (window as any)[key] = value.method.bind(this);
                    }
                }
            });
        }
    }

}
