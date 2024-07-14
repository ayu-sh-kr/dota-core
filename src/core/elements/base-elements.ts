import {BindConfig, MethodDetails, PropertyDetails} from "@dota/core/types/core.types.ts";

export abstract class BaseElement extends HTMLElement {
    [key: string]: any

    isShadow!: boolean;

    shadowRoot!: ShadowRoot

    protected constructor() {
        super();
    }

    connectedCallback() {

        // Expose the required method if annotated with @Expose
        this.exposeMethods();

        // Bind the HTML that is render the component
        this.bindHTML()

        // Bind the events with the method of the component
        this.bindMethods();
    }

    abstract render(): string;

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {

        let methods: MethodDetails[] = Reflect.getMetadata(this.constructor.name, this.constructor);

        if (newValue !== oldValue) {

            this.bindProperty(name, newValue);

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

    bindHTML() {
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
    }


    /**
     * Method to bind the event starting with @ in the inner html of component.
     * @method {Function} bindEvents
     * @param {HTMLElement | ShadowRoot} root
     * @param {MethodDetails[]} methods
     */
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

    /**
     * Method to bind the component's internal event to its methods
     * @method {Functional}: bindMethods
     */
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
                        const boundMethodWithParams = (event: Event, ...args: any[]) => method.apply(this, event, [...config.params!, ...args]);
                        element.addEventListener(config.event, boundMethodWithParams);
                    } else {
                        // If no params are provided, bind the method directly.
                        element.addEventListener(config.event, method.bind(this));
                    }
                }
            });
        }
    }

    /**
     * Method to expose component methods to global scope
     * @method {Function}: exposeMethods()
     */
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


    /**
     * Called By attributeChangeCallback to bind the property with new value
     * @method {Function}: bindProperty()
     * @param name
     * @param value
     */
    bindProperty(name: string, value: string) {

        const key = `${this.constructor.name}:Property`;

        let data: Map<string, PropertyDetails> = Reflect.getMetadata(key, this.constructor);

        if (data) {
            let property = data.get(name);

            if(property) {
                this[property.prototype] = value;
            }
        }
    }

}
