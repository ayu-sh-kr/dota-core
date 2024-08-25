import {BindConfig, EventDetails, MethodDetails, PropertyDetails} from "@dota/core/types/core.types.ts";
import {EventEmitter} from "@dota/core/utils/EventEmitter.ts";

export abstract class BaseElement extends HTMLElement {
    [key: string]: any

    isShadow!: boolean;

    shadowRoot!: ShadowRoot

    protected constructor() {
        super();
    }

    /**
     * Lifecycle method called when the component is added to the DOM.
     *
     * This method performs the following tasks:
     * 1. Executes methods annotated with \@BeforeInit decorator.
     * 2. Exposes methods annotated with \@Expose decorator to the global scope.
     * 3. Binds the component's HTML content and events.
     * 4. Binds the component's internal methods to their corresponding events.
     * 5. Binds event emitters to the component's properties.
     *
     * @method connectedCallback
     */
    connectedCallback() {

        // handle before init
        this.handleBeforeInit()

        // Bind the HTML that is render the component
        this.bindHTML()

        // Expose the required method if annotated with @Expose
        this.exposeMethods();

        // Bind the events with the method of the component
        this.bindMethods();

        // Bind the event instance with an emitter
        this.bindEmitter();

        // handle after init
    }

    disconnectedCallback() {
        this.unbindMethods();
    }

    abstract render(): string;

    /**
     * Updates the component's rendered HTML.
     *
     * This method re-renders the component's HTML content based on the current state.
     * If the component uses a shadow DOM, it updates the shadow root's inner HTML.
     * Otherwise, it updates the component's inner HTML. After updating the HTML,
     * it re-binds the component's methods to their corresponding events.
     *
     * @method updateHTML
     */
    updateHTML() {
        if (this.isShadow && this.shadowRoot) {
            this.shadowRoot.innerHTML = this.render();
        } else {
            this.innerHTML = this.render();
        }
        this.bindMethods();
    }


    /**
     * Called when an observed attribute changes.
     *
     * This method is invoked when one of the component's attributes, specified in the `observedAttributes` array, changes.
     * It updates the component's properties and re-renders the component if the new value is different from the old value.
     *
     * @method attributeChangedCallback
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (newValue !== oldValue) {
            this.bindProperty(name, newValue);
            this.updateHTML();
        }
    }

    setAttribute(qualifiedName: string, value: string) {
        this[qualifiedName] = value;
        super.setAttribute(qualifiedName, value);
    }

    /**
     * Executes methods annotated with \@BeforeInit decorator before the component initializes.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find methods marked with the \@BeforeInit decorator. It then invokes the
     * `beforeInit` method if it exists in the metadata, allowing for any setup
     * or initialization tasks to be performed before the component is fully initialized.
     *
     * @method handleBeforeInit
     */
    handleBeforeInit() {
        const key = `${this.constructor.name}:Before`
        const map: Map<string, Function> = Reflect.getMetadata(key, this.constructor);

        if(!map) return;

        const fun = map.get('beforeInit')

        if(fun) {
            fun.apply(this);
        }

    }

    /**
     * Binds the component's HTML content and events based on metadata.
     *
     * This method retrieves metadata associated with the component's constructor
     * to determine if the component should use a shadow DOM. It then sets the inner
     * HTML of the component or its shadow root to the result of the `render` method.
     * After setting the HTML, it binds events specified in the component's inner HTML
     * to their corresponding methods.
     *
     * @method bindHTML
     */
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
     * Binds events specified in the component's inner HTML to their corresponding methods.
     *
     * This method searches the component's inner HTML for event bindings in the format
     * `@event="{method}"`. It then attaches event listeners to the elements matching
     * these bindings, ensuring that the specified methods are called when the events
     * are triggered.
     *
     * @method bindEvents
     * @param {HTMLElement | ShadowRoot} root - The root element to search for event bindings.
     * @param {MethodDetails[]} methods - An array of method details to bind to the events.
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
     * Binds the component's internal events to its methods based on metadata.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find event binding configurations. It then binds the specified methods
     * to the corresponding events on the elements identified by the metadata.
     *
     * @method bindMethods
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
     * Unbinds component's methods from their associated events.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find methods that were previously bound to events. It then removes the
     * event listeners for these methods, effectively unbinding them.
     *
     * @method unbindMethods
     */
    unbindMethods() {
        let key = `${this.constructor.name}:Bind`;
        const data = this.getMetaData<Map<string, BindConfig>>(key, this.constructor);

        if(!data) return;

        data.forEach((config: BindConfig, method: String)=> {
            const element = this.querySelector(config.id);

            if(!element) return;
            element.removeEventListener(config.event, () => {});
        })

    }

    /**
     * Exposes component methods to the global scope.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find methods marked for exposure. It then binds these methods to the global
     * `window` object, making them accessible globally.
     *
     * @method exposeMethods
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
     * Binds a component's property to a new value based on metadata.
     *
     * This method is called by `attributeChangedCallback` to update the component's
     * properties when an attribute changes. It retrieves metadata associated with
     * the component's constructor to find property details and assigns the new value
     * to the corresponding property.
     *
     * @method bindProperty
     * @param {string} name - The name of the attribute that changed.
     * @param {string} value - The new value of the attribute.
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

    /**
     * Binds event emitters to the component's properties based on metadata.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find event details and binds an `EventEmitter` instance to each property
     * specified in the metadata. The event name is derived from the metadata.
     *
     * @method bindEmitter
     */
    bindEmitter() {
        const key = `${this.constructor.name}:Output`;
        const data = this.getMetaData<Map<string, EventDetails>>(key, this.constructor);

        if(!data) return;

        data.forEach((value: EventDetails, key: string) => {
            this[key] = new EventEmitter(value.eventName)
        })
    }

    getMetaData<T>(key: string, target: any): T {
        return Reflect.getMetadata(key, target) as T;
    }

}