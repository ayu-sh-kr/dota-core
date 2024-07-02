# @ayu-sh-kr/dota-core

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
