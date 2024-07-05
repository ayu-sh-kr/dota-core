# @ayu-sh-kr/dota-core

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
