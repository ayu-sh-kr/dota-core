# @ayu-sh-kr/dota-core

## 1.6.9

### Patch Changes

- 1e0e15b: Directory restructuring and added docs

## 1.6.8

### Patch Changes

- 5bc063b: Rolling back to tsup as build tool

## 1.6.7

### Patch Changes

- b99ea58: Fix package.json vite issue

## 1.6.6

### Patch Changes

- ae9553b: New release using vite-build

## 1.6.5

### Patch Changes

- 61136d4: Update build tool -> added vite, rename import from property type

## 1.6.4

### Patch Changes

- 35adbc0: Bug fix for BooleanType -> fix issue where boolean conversion was failing for 'false'

## 1.6.3

### Patch Changes

- 4ca57ee: Added Type Sanitization for the Property types

  ```typescript
  export class TestComponent extends BaseElement {
    @Property({
      name: "data",
      type: NumberType,
    })
    data!: number;

    constructor() {
      super();
    }

    render() {
      return ``;
    }
  }
  ```

## 1.6.2

### Patch Changes

- 6cc3635: Added method bootstrap to initialize components, by passing them as an array to the function argument

## 1.6.1

### Patch Changes

- 197982b: Update the property reactivity to update dom too

## 1.6.0

### Minor Changes

- f6c5168: ## Stable version 1.6.0
  Update project -> Automate reactivity for change in the property value by updating dom by default.

  ### Reactive support

  With reactivity dom gets update each time a property marked as **@Property** gets its value changed.

  ```typescript HTML
  import { BaseElement } from "./base-elements";
  import { BindEvent, Component, Property } from "./app.decorator";

  @Component({
    selector: "app-counter",
    shadow: false,
  })
  export class CounterComponent extends BaseElement {
    @Property({ name: "count" })
    count!: number;

    @BindEvent({ event: "click", id: "#button" })
    increment() {
      this.count += 1;
    }

    render() {
      return `
              <div>${this.count}</div>
              <button id="button" type="submit">Click Me</button>
          `;
    }
  }
  ```

  ```HTML
  <app-count count="0"></app-count>
  ```

## 1.5.17

### Patch Changes

- 135ce18: Bug fix in BaseElement

## 1.5.16

### Patch Changes

- b0aedc0: Minor bug fix for method binding

## 1.5.15

### Patch Changes

- 5cba398: Did code optimization for decorator, reduce repeatation and added js docs

## 1.5.14

### Patch Changes

- 332d504: issue fix for shadow root component
- 321fee2: Update BaseElement mix bug for un-initialized event emitters decorated with @Event

## 1.5.13

### Patch Changes

- 6dd4112: bug fix

## 1.5.12

### Patch Changes

- 5f30197: Fix the base element for error where attribute change override the inner html.

  Redefine the @BeforeInit using reflect handle attribute change efficiently

## 1.5.11

### Patch Changes

- 52a3820: Fix the project export

## 1.5.10

### Patch Changes

- 0cee44f: Did some code refactoring for export and added new decorator @BeforeInit

  ### BeforeInit

  It is used to do something before rendering the component, you can access the inner html of your custom component and assign it to itself

  ```typescript
  import { Component, BaseElement, BeforeInit } from "./index";

  @Component({
    selector: "app-scaffold",
    shadow: true,
  })
  export class ScaffoldComponent extends BaseElement {
    @AfterInit()
    afterInit() {}

    render(): string {
      return `
              <div class="scaffold">
                  <slot/>
              </div>
              <style>
                  @tailwind base;
                  @tailwind utilities;
                  @tailwind components;
  
                   .scaffold {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 100vw;
                      height: 100vh;
                   }
              </style>
          `;
    }
  }
  ```

## 1.5.9

### Patch Changes

- 1a925d0: Refactor in the code for new changes

## 1.5.8

### Patch Changes

- 8c75008: Added @Output decorator to initialize EventEmitters

  ```typescript
  import { AfterInit, BaseElement, Component, EventEmitter } from "./index";
  import { Output } from "./output.decorator";

  @Component({
    selector: "tidy-dryers",
    shadow: false,
  })
  export class TidyDryersWink extends BaseElement {
    @Output()
    color!: EventEmitter<string>;

    @AfterInit
    afterInit() {
      this.color.emit("data", this);
    }

    render() {
      return "";
    }
  }
  ```

  ```typescript
  import { BaseElement, Component, EventListener, HTML } from "./index";
  import { EventType } from "./core.types";

  @Component({
    selector: "listener-component",
    shadow: false,
  })
  export class ListenerComponent extends BaseElement {
    @EventListener({ name: "onColorChange", type: EventType.ROOT })
    logEvent(event: Event) {
      console.log(event);
    }

    render() {
      return HTML`
              <tidy-dryers></tidy-dryers>
          `;
    }
  }
  ```

## 1.5.7

### Patch Changes

- 8bce8ff: Update EventListener to listen for window and element level events

## 1.5.6

### Patch Changes

- 7e0bc8e: Added Docs and New Class EventEmitter for dispatching custom events.

  ```typescript
  import { BaseElement, BindEvent, Component, Property } from "./index";
  import { EventEmitter } from "./EventEmitter";

  @Component({
    selecter: "brave-seas",
    shadow: false,
  })
  export class BraveSeasProve extends BaseElement {
    @Property({ name: "data" })
    data!: string;

    dataChange = new EventEmitter<string>("data-change");

    @BindEvent({ event: "click", id: "#chng" })
    change() {
      this.dataChange.emit("new-value");
    }

    render() {
      return HTML`<div id="chng">${this.data}</div>`;
    }
  }
  ```

## 1.5.5

### Patch Changes

- 860add1: Added Decorator AfterInit -> Run methods after view initialization

  ```typescript
  import { BaseElement, Component, HTML } from "./index";
  import { AfterInit } from "./after-init.decorator";

  @Component({
    selector: "neat-pots",
    shadow: false,
  })
  export class NeatPotsBeam extends BaseElement {
    constructor() {
      super();
    }

    @AfterInit()
    afterInit() {
      console.log("Run After View is Rendered");
    }

    render() {
      return HTML`
              <div>This is a Custom Element Component</div>
          `;
    }
  }
  ```

## 1.5.4

### Patch Changes

- 55b0cf8: Wrote docs and fix HTML template render

## 1.5.3

### Patch Changes

- 3762dd4: exported the BaseElement class

## 1.5.2

### Patch Changes

- 90a9de7: Move Core to src folder for better structuring

## 1.5.1

### Patch Changes

- 4c07929: Fix property bind procedure

  ```typescript
  @Component({
    selector: "text-component",
  })
  export class TextComponent extends BaseElement {
    @Property({ name: "text" })
    text!: string;

    render() {
      return HTML`
          <div>${this.text}</div>
          `;
    }
  }
  ```

  ```html
  <text-component text="Text to render"></text-component>
  ```

  Now if we want the attribute name to be different

  ```typescript
  @Component({
    selector: "text-component",
  })
  export class TextComponent extends BaseElement {
    @Property({ name: "data" })
    text!: string;

    render() {
      return HTML`
          <div>${this.text}</div>
          `;
    }
  }
  ```

  ```html
  <text-component data="Text to render"></text-component>
  ```

## 1.5.0

### Minor Changes

- 73b88a0: Added Feature for Method Binding to Event and Element

  ### Event Binding

  Process of Binding Events on Element to the Class Method, fallback feature till the
  template rendering available

  ```typescript
  import { BaseElement, Component, HTML, Property } from "./index";
  import { BindEvent } from "./bind-event.decorators";

  @Component({
    selecter: "text-component",
    shadow: false,
  })
  export class TextComponent extends BaseElement {
    @Property({ name: "text" })
    text!: string;

    @BindEvent({ event: "click", id: "#clr12" })
    handleClick() {
      console.log("clicked");
    }

    render() {
      return HTML`
          <div id="clr12">${this.text}<div>
          `;
    }
  }
  ```

## 1.4.2

### Patch Changes

- e16d9eb: Fix bugs and added new features

  ```typescript
  @Component({
    selector: "color-text",
    shadow: false,
  })
  export class ColoredTextComponent extends BaseElement {
    @Property({ name: "text" })
    text!: string;

    @Property({ name: "color" })
    color!: string;

    @Property({ name: "bold" })
    bold!: boolean;

    colorSet = ["text-purple-400", "text-yellow-400", "text-emerald-400"];

    constructor() {
      super();
    }

    @Expose()
    changeColor() {
      const randomIndex = Math.floor(Math.random() * this.colorSet.length);
      this.setAttribute("color", this.colorSet[randomIndex]);
    }

    render(): string {
      const bold = this.bold ? "font-semibold" : "";
      return HTML`
              <div class="${this.color} ${bold} flex flex-col items-center">
                  <div>${this.text}</div>
                  <span
                      id="chng"
                      class="text-center w-fit px-3 py-1 cursor-pointer text-white bg-yellow-400 active:scale-95 text-sm border rounded-lg"
                      onclick="changeColor()"
                  >
                      Click to Change Color
                  </span>
              </div>
          `;
    }
  }
  ```

  - Adding @Expose to method of class will expose them to global space.
  - Fix @Component, now shadow parameter will attach shadow root based on its value.

## 1.4.1

### Patch Changes

- e3e562b: Fixed error in Property Decorator

## 1.4.0

### Minor Changes

- 2b4d7b2: Modified BaseElement to bind events from template element to template itself

  ```typescript
  import { BaseElement } from "./base-elements";
  import { HTML } from "./html.render";

  export class ColorTextComponent extends BaseElement {
    handleClick() {
      console.log("clicked");
    }

    render() {
      return HTML`
              <div @click="{handleClick}">Click Me<div>
          `;
    }
  }
  ```

## 1.3.0

### Minor Changes

- 809390f: Added EventListener decorator to map Component Events Directly to Component Method

  ```typescript
  import {
    HTML,
    Component,
    BaseElement,
    Property,
    EventListener,
  } from "./index";

  export class Widget extends BaseElement {
    @Propert({ name: "data" })
    data: string;

    constructor() {
      super();
    }

    @EventListener({ name: "click" })
    handleClick() {
      console.log("clicked");
    }

    render() {
      return HTML`<div>Click Me</div>`;
    }
  }
  ```

## 1.2.0

### Minor Changes

- 2613dc7: Change the publish configuration in package.json: files: ['dist']

## 1.1.1

### Patch Changes

- bcc5b83: Added workflow to .npmignore

## 1.1.0

### Minor Changes

- 11f87eb: Added JS Docs for the Component Decorator
