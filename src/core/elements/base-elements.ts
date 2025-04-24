import {HelperUtils} from "@dota/core/helper";
import {
  BindConfig, ElementConfigInternal, EventDetails,
  EventOptionMeta,
  MethodDetails, ParameterConfig,
  PropertyDetails, StateConfig
} from "@dota/core/types";
import {EventEmitter, Sanitizer} from "@dota/core/utils";
import {EventManagerService} from "@dota/core/services";


export abstract class BaseElement extends HTMLElement {
  [key: string]: any

  isShadow!: boolean;

  shadowRoot!: ShadowRoot;

  reactive = false;

  private eventManagerService: EventManagerService<BaseElement>;

  protected constructor() {
    super();
    this.eventManagerService = new EventManagerService(this);
  }

  /**
   * Lifecycle method called when the component is added to the DOM.
   *
   * This method performs essential tasks synchronously and defers non-critical tasks
   * using microtasks (via Promise.resolve()) to avoid blocking the main thread.
   * 
   * @method connectedCallback
   */
  connectedCallback() {
    // Critical operations that should execute immediately
    this.handleBeforeInit();
    this.bindHTML();

    const exposedMethods = this.exposeMethods();
    const bindMethods = this.bindMethods();
    const bindEmitter = this.bindEmitter();
    const bindHostEvents = this.bindHostEvents();
    const bindWindowEvents = this.bindWindowEvents();
    const bindDocumentEvents = this.bindDocumentEvents();
    const bindParameters = this.bindParameters();
    const bindState = this.bindState(this);
    const bindElements = this.bindElements();

    Promise.all([
      exposedMethods, bindMethods, bindEmitter, bindHostEvents,
      bindWindowEvents, bindDocumentEvents, bindParameters, bindState,
      bindElements
    ])
      .catch((reason) => console.error(reason));

    this.handleAfterInit();
  }

  disconnectedCallback() {
    const unbindMethods = this.unbindMethods();
    const unbindHostEvents = this.unbindHostEvents();
    const unbindWindowEvents = this.unbindWindowEvents();
    const documentEvents = this.unbindDocumentEvents();

    Promise.all([unbindMethods, unbindHostEvents, unbindWindowEvents, documentEvents])
      .catch((reason) => console.error(reason));
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
    const bindMethods = this.bindMethods();
    const bindElements = this.bindElements();

    Promise.all([bindMethods, bindElements])
      .catch((reason) => console.error(reason));
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

    if (!newValue) {
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

    if (fun) {
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
  private handleAfterInit() {

    const data: Map<string, Function> = HelperUtils.fetchOrCreate<Function>(this, 'After');

    const fun = data.get('afterViewInit')

    if (fun) {
      fun.apply(this);
      this.updateHTML();
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
  private bindHTML() {

    this.isShadow = Reflect.getMetadata(this.constructor.name + ':' + 'shadow', this.constructor)

    if (this.isShadow) {
      this.shadowRoot = this.attachShadow({mode: "open"})
    }

    if (this.isShadow) {
      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = this.render();
      }
    } else {
      this.innerHTML = this.render();
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
  private async bindMethods() {
    let data = HelperUtils.fetchOrCreate<BindConfig>(this, 'Bind');
    if (data) {
      data.forEach((config, methodName) => {
        const element: HTMLElement | null = this.isShadow ? this.shadowRoot.querySelector(config.id) : this.querySelector(config.id);
        if (element) {
          this.eventManagerService.bindEvent(element, {
            event: config.event,
            name: methodName,
            method: this[methodName].bind(this)
          }, 'Bind')
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
  private async unbindMethods() {

    const data = HelperUtils.fetchOrCreate<BindConfig>(this, 'Bind')

    if (!data) return;

    data.forEach((config: BindConfig, method: string) => {
      const element: HTMLElement | null = this.querySelector(config.id);
      if (!element) return;
      this.eventManagerService.unbindEvent(element, {
        event: config.event,
        name: method,
        method: this[method].bind(this)
      }, 'Bind');
    });
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
  private async exposeMethods() {

    let data = HelperUtils.fetchOrCreate<MethodDetails>(this, 'Exposed')

    if (data) {
      data.forEach((value, key) => {
        if (typeof window !== "undefined") {
          if (!(window as any)[key]) {
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
  private bindProperty(name: string, value: any) {

    let data: Map<string, PropertyDetails> = HelperUtils.fetchOrCreate<PropertyDetails>(this, 'Property')

    if (data) {
      let property = data.get(name);

      if (property) {
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
  private async bindEmitter() {

    let data = HelperUtils.fetchOrCreate<EventDetails>(this, 'Output')

    if (!data) return;

    data.forEach((value: EventDetails, key: string) => {
      this[key] = new EventEmitter(value.eventName)
    })
  }


  /**
   * Binds host events to the component's methods based on metadata.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find host event configurations. It then binds the specified methods
   * to the corresponding events on the host element or its shadow root. If the event is
   * a string, it adds a single event listener. If the event is an array of strings,
   * it traverses the array and adds event listeners for each event.
   *
   * @method bindHostEvents
   *
   * @example
   * // Example of using bindHostEvents to bind host events
   * class MyComponent extends BaseElement {
   *   \@HostListener({ event: 'click' })
   *   public handleClick(event: Event) {
   *     console.log('Host element clicked', event);
   *   }
   * }
   *
   * const myComponent = new MyComponent();
   * myComponent.bindHostEvents();
   * // The click event on the host element will now trigger the handleClick method
   */
  private async bindHostEvents() {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(this, 'Host');

    if (!data) return;

    data.forEach((value: EventOptionMeta) => {
      const element = this.isShadow ? this.shadowRoot : this;
      if (element) {
        this.eventManagerService.bindEvent(element, value, 'Host');
      }
    });
  }

  /**
   * Unbinds host events from the component's methods.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find host event configurations that were previously bound. It then removes
   * the event listeners from the host element or its shadow root.
   *
   * @method unbindHostEvents
   */
  private async unbindHostEvents() {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(this, 'Host');

    if (!data) return;

    data.forEach((option: EventOptionMeta) => {
      const element = this.isShadow ? this.shadowRoot : this;

      if (element) {
        this.eventManagerService.unbindEvent(element, option, 'Host');
      }
    });
  }


  /**
   * Binds window events to the component's methods based on metadata.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find window event configurations. It then binds the specified methods
   * to the corresponding events on the global `window` object. If the event is
   * a string, it adds a single event listener. If the event is an array of strings,
   * it traverses the array and adds event listeners for each event.
   *
   * @method bindWindowEvents
   *
   * @example
   * // Example of using bindWindowEvents to bind window events
   * class MyComponent extends BaseElement {
   *   \@WindowListener({ event: 'resize' })
   *   public handleResize(event: Event) {
   *     console.log('Window resized', event);
   *   }
   * }
   *
   * const myComponent = new MyComponent();
   * myComponent.bindWindowEvents();
   * // The resize event on the window will now trigger the handleResize method
   */
  private async bindWindowEvents() {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(this, 'Window');

    if (!data) return;

    data.forEach((value: EventOptionMeta) => {
      this.eventManagerService.bindEvent(window, value, 'Window');
    })
  }

  /**
   * Unbinds window events from the component's methods.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find window event configurations that were previously bound. It then removes
   * the event listeners from the global `window` object.
   *
   * @method unbindWindowEvents
   */
  private async unbindWindowEvents() {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(this, 'Window');

    if (!data) return;

    data.forEach((value: EventOptionMeta) => {
      if (typeof value.event === 'string') {
        window.removeEventListener(value.event, (event: Event) => value.method.call(this, event));
      } else if (Array.isArray(value.event)) {
        value.event.forEach((eventName) => {
          window.removeEventListener(eventName, (event: Event) => value.method.call(this, event));
        });
      }
    });
  }


  /**
   * Binds document events to the component's methods based on metadata.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find document event configurations. It then binds the specified methods
   * to the corresponding events on the global `document` object. If the event is
   * a string, it adds a single event listener. If the event is an array of strings,
   * it traverses the array and adds event listeners for each event.
   *
   * @method bindDocumentEvents
   */
  private async bindDocumentEvents() {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(this, 'Document');

    if (!data) return;

    data.forEach((value: EventOptionMeta) => {
      this.eventManagerService.bindEvent(document, value, 'Document');
    })
  }

  /**
   * Unbinds document events from the component's methods.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find document event configurations that were previously bound. It then removes
   * the event listeners from the global `document` object.
   *
   * @method unbindDocumentEvents
   */
  private async unbindDocumentEvents() {
    const data = HelperUtils.fetchOrCreate<EventOptionMeta>(this, 'Document');

    if (!data) return;

    data.forEach((value: EventOptionMeta) => {
      this.eventManagerService.unbindEvent(document, value, 'Document');
    });
  }


  /**
   * Binds URL parameters to the component's properties based on metadata.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find parameter configurations. It then binds the specified parameters
   * to the corresponding properties on the component, allowing for dynamic
   * updates based on URL query parameters.
   *
   * @method bindParameters
   */
  private async bindParameters() {
    const data = HelperUtils.fetchOrCreate<ParameterConfig>(this, 'Param');
    const params = new URLSearchParams(window.location.search);
    if (data) {
      data.forEach((value: ParameterConfig, key: string) => {
        this[key] = params.get(value.name)
      })
    }
  }

  /**
   * Binds state properties to the component's properties based on metadata.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find state configurations. It then binds the specified state properties
   * to the corresponding properties on the component, allowing for reactive updates
   * and change detection.
   *
   * @method bindState
   */
  private async bindState(element: BaseElement) {
    let data = HelperUtils.fetchOrCreate<StateConfig>(element, 'State');

    data.forEach((value: StateConfig) => {
      const propertyKey = `_${value.prototype}`

      Object.defineProperty(element, value.prototype, {
        get(): any {
          return element[propertyKey]
        },

        set(v: any) {
          if (element[propertyKey] !== v) {
            element[propertyKey] = v;
            element.updateHTML();

            HelperUtils.bindWatchers(element, value.prototype);
          }
        },

        enumerable: true,
        configurable: true
      });
    });
  }

  /**
   * Binds elements to the component's properties based on metadata.
   *
   * This method retrieves metadata associated with the component's constructor
   * to find element configurations. It then binds the specified elements to
   * the corresponding properties on the component, allowing for easy access
   * to DOM elements within the component.
   *
   * @method bindElements
   */
  private async bindElements() {
    const data = HelperUtils.fetchOrCreate<ElementConfigInternal>(this, 'Element');
    if (!data) return;

    data.forEach((value) => {
      let selector = '';
      if (value.by === 'id') selector = `#${value.selector}`;
      if (value.by === 'class') selector = `.${value.selector}`;
      if (value.by === 'tag') selector = value.selector;
      if (this.isShadow) {
        this[value.property] = this.shadowRoot.querySelector(selector)
        return;
      }
      this[value.property] = this.querySelector(selector)
    })
  }


}