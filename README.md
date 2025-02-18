# dota-core

`dota-core` is a utility library for creating and managing web components. 
It provide clean API and functions to manage aspect such as `Property Binding`, 
`Event Binding`, `Listeners`, `Reactivity` etc. The library aims to simplify the 
development of web components by offering tools to efficiently manage component properties, 
events, and their interactions.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation
You can install dota core using any popular package manager of your choice
which install packages for `npm`.

```shell
npm install @ayu-sh-kr/dota-core
```

## Usage

## Creating Web Components Using `dota-core`

### Step-by-Step Guide

### 1. Install `dota-core`

First, install the `dota-core` library using npm:

```sh
npm install @ayu-sh-kr/dota-core
```

### 2. Define a Web Component

Create a new TypeScript file for your web component. Import the necessary decorators and base classes from `dota-core`.

```typescript
import {BaseElement, Component} from '@ayu-sh-kr/dota-core';

@Component({
    selecter: 'hello-dota',
    shadow: false
})
class MyComponent extends BaseElement {

    name = 'Dota';
    
    constructor() {
        super();
    }
    
    render() {
        // language=HTML
        return `
        <div>Hello ${this.name}</div>
        `
    }

}

```
### 3. Bootstrapping Web Components
Registers the web component with browser for use.

```typescript
import {bootstrap} from "@ayu-sh-kr/dota-core";
import {MyComponent} from 'component-location';

bootstrap([
    MyComponent
]);
```

### 4. Use the Web Component

Include the custom element in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web Component</title>
</head>
<body>
  <hello-dota></hello-dota>
  <script type="module" src="./path-to-your-component.ts"></script>
</body>
</html>
```

## Property Binding
With property binding attributes in the component tags are coupled with the field in the component class.
Which allows you to use those property and perform operations on it. Adds reactivity and changes are reflected 
on the UI.

```typescript
import {Component, BaseElement, Property, String} from "@ayu-sh-kr/dota-core";

@Component({
    selecter: 'dota-text',
    shadow: false
})
export class TextComponent extends BaseElement {

    @Property({
        name: 'data',
        type: String
    })
    data!: string

    constructor() {
        super();
    }
    
    render() {
        return `
        <p>${this.data}</p>
        `
    }

}
```

```html
<dota-text data="Hello Dota"></dota-text>
```

## Event Binding
Event binding in web components refers to the process of attaching event listeners to elements within the component. 
This allows the component to respond to user interactions or other events. `dota-core` allows you to 
bind event specific to host, window and elements withing the host component.

### Host Event Listener
The decorator `@HostEventListener` allows you to watch the event on the host component and map it to the method inside the `HostComponent`.

```typescript
import {Component, BaseElement, Property, String, HostListener} from "@ayu-sh-kr/dota-core";

@Component({
    selecter: 'dota-button',
    shadow: false
})
export class TextComponent extends BaseElement {

    constructor() {
        super();
    }

    @HostListener({ event: 'click'})
    handleClick() {
        console.log('Clicked ...')
    }

    render() {
        return `
        <button>Click Me</button>
        `
    }

}
```

### Window Event Listener
THe decorator `@WindowEventListener` allows you to watch for the event emitter at the window level and
map those to method internal to the given component and take action accordingly.

```typescript
import {Component, BaseElement, Property, String, WindowListener} from "@ayu-sh-kr/dota-core";

@Component({
    selecter: 'dota-button',
    shadow: false
})
export class TextComponent extends BaseElement {

    constructor() {
        super();
    }

    @WindowListener({event: 'click'})
    handleClick() {
        console.log('Clicked ...')
    }

    // othe methods ...

}
```

### Event Binding
Use the decorator `@BindEvent` to map the internal element via id with an event you want to listen for.

```typescript
import {BaseElement, Component, Property, BindEvent} from "@ayu-sh-kr/dota-core";
import {StringType} from "./property.types";

@Component({
    selecter: 'text-component',
    shadow: false
})
export class TextComponent extends BaseElement {

    @Property({name: 'text', type: StringType})
    text!: string

    @BindEvent({event: 'click', id: '#clr12'})
    handleClick() {
        console.log('clicked')
    }

    render() {
        return `
        <div id="clr12">${this.text}<div>
        `
    }
}
```

## Emitting Custom Events
Event emitters object and decorator are used to emit custom event based on certain behavior.
`dota-core` provide decorator `@Event` and object `EventEmitter` for defining custom emitter and
that emitter can be further used to emit custom events.

### EventEmitter Object
```typescript
import {BaseElement, BindEvent, Component, Property, EventEmitter, String} from "@ayu-sh-kr/dota-core";

@Component({
    selecter: 'brave-seas',
    shadow: false
})
export class BraveSeasProve extends BaseElement {

    @Property({name: 'data', type: String})
    data!: string

    dataChange = new EventEmitter<string>('data-change')

    @BindEvent({event: 'click', id: '#chng'})
    change() {
        this.dataChange.emit('new-value')
    }

    render() {
        return `<div id="chng">${this.data}</div>`
    }
}
```

### @Event Annotation
Added **@Event** decorator to initialize EventEmitters

```typescript
import {AfterInit, BaseElement, Component, EventEmitter, Event} from "@ayu-sh-kr/dota-core";

@Component({
    selector: 'tidy-dryers',
    shadow: false
})
export class TidyDryersWink extends BaseElement {

    @Event()
    colorChange!: EventEmitter<string>

    @AfterInit
    afterViewInit() {
        this.color.emit('data', this)
    }
    
    render() {
        return '';
    }
}
```

## Handling Behavior Before and After Rendering

### Add Code and Changes Before View Init using `@BeforeInit()`

```typescript
import {Component, BaseElement, BeforeInit} from "@ayu-sh-kr/dota-core";

@Component({
    selector: 'app-scaffold',
    shadow: true
})
export class ScaffoldComponent extends BaseElement {

    @BeforeInit()
    beforeViewInit() { // function name must be the beforeViewInit
    }

    render(): string {
        return `
            <div class="scaffold">
                <slot/>
            </div>
            <style> 
                 .scaffold {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;
                    height: 100vh;
                 }
            </style>
        `
    }

}
```

### Add Code and Changes After View is Rendered using `@AfterViewInit()`


```typescript
import {BaseElement, Component, HTML, AfterInit} from "@ayu-sh-kr/dota-core";

@Component({
    selector: 'neat-pots',
    shadow: false
})
export class NeatPotsBeam extends BaseElement {

    constructor() {
        super();
    }

    @AfterInit()
    afterViewInit() { // function name must be afterViewInit
        console.log('Run After View is Rendered');
    }

    render() {
        return HTML`
            <div>This is a Custom Element Component</div>
        `
    }
}
```

### Summary

- **Install**: Use npm to install `dota-core`.
- **Use**: Include the custom element in your HTML file.

This guide provides a basic example of creating and using a web component with `dota-core`. For more advanced usage and features, refer to the library's API documentation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.



