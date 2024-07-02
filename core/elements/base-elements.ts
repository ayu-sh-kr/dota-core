import {MethodDetails} from "@dota/types/core.types.ts";

export abstract class BaseElement extends HTMLElement {
    [key: string]: any

    isShadow: boolean = false;

    shadowRoot!: ShadowRoot

    protected constructor() {
        super();
    }

    connectedCallback() {

        let methods: MethodDetails[] = Reflect.getMetadata(this.constructor.name, this.constructor);


        if(this.isShadow){
            this.shadowRoot = this.attachShadow({mode: "open"})
        }

        if (this.isShadow) {
            console.log(this.shadowRoot)
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = this.render();
                this.bindEvents(this, methods);
            }
        } else {
            this.innerHTML = this.render();
            this.bindEvents(this, methods);
        }
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

}
