import {HelperUtils} from "@dota/core/helper";
import {BindConfig, EventDetails, MethodDetails, PropertyDetails} from "@dota/core/types";
import {EventEmitter, Sanitizer} from "@dota/core/utils";


export abstract class BaseElement extends HTMLElement {
    [key: string]: any

    isShadow!: boolean;

    shadowRoot!: ShadowRoot;

    reactive = false;

    protected constructor() {
        super();
    }

    /**
     * Lifecycle method called when the component is added to the DOM.
     *
     * This method performs the following tasks:
     * 1. Executes methods annotated with `@BeforeInit` decorator.
     * 2. Exposes methods annotated with `@Expose` decorator to the global scope.
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
        this.handleAfterInit();
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
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {

        if (!this.reactive) {
            HelperUtils.bindReactive(this);
        }

        if(!newValue) {
            return;
        }

        if (newValue !== oldValue) {
            this.bindProperty(name, newValue);
            this.updateHTML();
        }
    }

    /**
     * Sets the value of an attribute on the component and updates the corresponding property.
     *
     * This method overrides the default `setAttribute` method to ensure that the component's
     * property is updated whenever an attribute is set. It assigns the provided value to the
     * property with the same name as the attribute and then calls the superclasses `setAttribute`
     * method to update the attribute on the DOM element.
     *
     * @param {number} qualifiedName - The name of the attribute to set.
     * @param {number} value - The value to assign to the attribute.
     */
    setAttribute(qualifiedName: string, value: any) {
        super.setAttribute(qualifiedName, value);
    }

    /**
     * Executes methods annotated with `@BeforeInit` decorator before the component initializes.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find methods marked with the `@BeforeInit` decorator. It then invokes the
     * `beforeInit` method if it exists in the metadata, allowing for any setup
     * or initialization tasks to be performed before the component is fully initialized.
     *
     * @method handleBeforeInit
     */
    handleBeforeInit() {

        let data: Map<string, Function> = HelperUtils.fetchOrCreate<Function>(this, 'Before')

        const fun = data.get('beforeViewInit')

        if(fun) {
            fun.apply(this);
        }

    }

    /**
     * Executes methods annotated with `@AfterInit` decorator after the component initializes.
     *
     * This method retrieves metadata associated with the component's constructor
     * to find methods marked with the `@AfterInit` decorator. It then invokes the
     * `afterInit` method if it exists in the metadata, allowing for any setup
     * or initialization tasks to be performed after the component is fully initialized.
     *
     * @method handleAfterInit
     */
    handleAfterInit() {

        let data: Map<string, Function> = HelperUtils.fetchOrCreate<Function>(this, 'After');

        let fun = data.get('afterViewInit')

        if (fun) {
            fun.apply(this);
        }

    }

    /**
     * Binds the component's `HTML` content and events based on metadata.
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
        let data = HelperUtils.fetchOrCreate<BindConfig>(this, 'Bind');
        if(data) {
            data.forEach((config, methodName) => {
                const element = this.isShadow ? this.shadowRoot.querySelector(config.id) : this.querySelector(config.id);
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

        const data = HelperUtils.fetchOrCreate<BindConfig>(this, 'Bind')

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

        let data = HelperUtils.fetchOrCreate<MethodDetails>(this, 'Exposed')

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
    bindProperty(name: string, value: any) {

        let data: Map<string, PropertyDetails> = HelperUtils.fetchOrCreate<PropertyDetails>(this, 'Property')

        if (data) {
            let property = data.get(name);

            if(property) {
                this[property.prototype] = Sanitizer.sanitize(value, property.type);
                return;
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

        let data = HelperUtils.fetchOrCreate<EventDetails>(this, 'Output')

        if(!data) return;

        data.forEach((value: EventDetails, key: string) => {
            this[key] = new EventEmitter(value.eventName)
        })
    }

}