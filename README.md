### DOTA CORE
* Templating Library for Web Components
* Provides decorators based support for Web Components

```typescript
import {HTML, Component, BaseElement, Property, EventListener, EventType} from "./index";

export class Widget extends BaseElement {

    @Propert({name: 'data'})
    data: string;

    constructor() {
        super();
    }

    @EventListener({name: 'click', type: EventType.ROOT})
    handleClick() {
        console.log('clicked')
    }

    render() {
        return HTML`<div>Click Me</div>`
    }
}
```
* EventType.ROOT -> Represents the current element (attach listener to an element)

```typescript
import {Component} from "./index";

import {HTML, Component, BaseElement, Property, EventListener, EventType} from "./index";

export class Widget extends BaseElement {

    @Propert({name: 'data'})
    data: string;

    constructor() {
        super();
    }

    @EventListener({name: 'click', type: EventType.WINDOW})
    handleClick() {
        console.log('clicked')
    }

    render() {
        return HTML`<div>Click Me</div>`
    }
}
```
* EventType.WINDOW -> Represent the window object (attach listener to the window)


### Inner Component Event Handling

```typescript
import {BaseElement} from "./base-elements";
import {HTML} from "./html.render";

export class ColorTextComponent extends BaseElement {
    
    handleClick(){
        console.log('clicked')
    }

    render() {
        return HTML`
            <div @click="{handleClick}">Click Me<div>
        `
    }
}
```
*Currently only work for methods with no parameters*

### Exposing Class Methods to Global Namespace

```typescript
@Component({
    selector: 'color-text',
    shadow: false
})
export class ColoredTextComponent extends BaseElement {

    @Property({name: 'text'})
    text!: string

    @Property({name: 'color'})
    color!: string

    @Property({name: 'bold'})
    bold!: boolean

    colorSet = ['text-purple-400', 'text-yellow-400', 'text-emerald-400']
    
    constructor() {
        super();
    }
    
    @Expose()
    changeColor() {
        const randomIndex = Math.floor(Math.random() * this.colorSet.length);
        this.setAttribute('color', this.colorSet[randomIndex])
    }

    render(): string {
        const bold = this.bold ? 'font-semibold' : '';
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


### Event Binding
Process of Binding Events on Element to the Class Method, fallback feature till the
template rendering available

```typescript
import {BaseElement, Component, HTML, Property} from "./index";
import {BindEvent} from "./bind-event.decorators";

@Component({
    selecter: 'text-component',
    shadow: false
})
export class TextComponent extends BaseElement {

    @Property({name: 'text'})
    text!: string

    @BindEvent({event: 'click', id: '#clr12'})
    handleClick() {
        console.log('clicked')
    }

    render() {
        return HTML`
        <div id="clr12">${this.text}<div>
        `
    }
}
```

### Property Binding
```typescript

@Component({
    selector: 'text-component'
})
export class TextComponent extends BaseElement {
    
    @Property({name: 'text'})
    text!: string;
    
    render() {
        return HTML`
        <div>${this.text}</div>
        `
    }
}
```

```html
<text-component text="Text to render"></text-component>
```

Now if we want the attribute name to be different

```typescript
@Component({
    selector: 'text-component'
})
export class TextComponent extends BaseElement {

    @Property({name: 'data'})
    text!: string;

    render() {
        return HTML`
        <div>${this.text}</div>
        `
    }
}
```

```html
<text-component data="Text to render"></text-component>
```

### Add Code and Changes After View is Rendered

```typescript
import {BaseElement, Component, HTML} from "./index";
import {AfterInit} from "./after-init.decorator";

@Component({
    selector: 'neat-pots',
    shadow: false
})
export class NeatPotsBeam extends BaseElement {

    constructor() {
        super();
    }

    @AfterInit()
    afterInit() {
        console.log('Run After View is Rendered');
    }

    render() {
        return HTML`
            <div>This is a Custom Element Component</div>
        `
    }
}
```


### EventEmitter

```typescript
import {BaseElement, BindEvent, Component, Property} from "./index";
import {EventEmitter} from "./EventEmitter";

@Component({
    selecter: 'brave-seas',
    shadow: false
})
export class BraveSeasProve extends BaseElement {

    @Property({name: 'data'})
    data!: string

    dataChange = new EventEmitter<string>('data-change')

    @BindEvent({event: 'click', id: '#chng'})
    change() {
        this.dataChange.emit('new-value')
    }

    render() {
        return HTML`<div id="chng">${this.data}</div>`
    }
}
```
### @Output Annotation
Added @Output decorator to initialize EventEmitters

```typescript
import {AfterInit, BaseElement, Component, EventEmitter} from "./index";
import {Event} from "./event.decorator";

@Component({
    selector: 'tidy-dryers',
    shadow: false
})
export class TidyDryersWink extends BaseElement {

    @Event()
    colorChange!: EventEmitter<string>

    @AfterInit
    afterInit() {
        this.color.emit('data', this)
    }
    
    render() {
        return '';
    }
}
```

```typescript
import {BaseElement, Component, EventListener, HTML} from "./index";
import {EventType} from "./core.types";

@Component({
    selector: 'listener-component',
    shadow: false
})
export class ListenerComponent extends BaseElement {

    @EventListener({name: 'onColorChange', type: EventType.ROOT})
    logEvent(event: Event) {
        console.log(event);
    }


    render() {
        return HTML`
            <tidy-dryers></tidy-dryers>
        `
    }
}
```


### BeforeInit
It is used to do something before rendering the component, you can access the inner html of your custom component and assign it to itself

```typescript
import {Component, BaseElement, BeforeInit} from "./index";

@Component({
    selector: 'app-scaffold',
    shadow: true
})
export class ScaffoldComponent extends BaseElement {

    @AfterInit()
    afterInit() {
    }

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
        `
    }

}
```

## Stable version 1.6.0
Update project -> Automate reactivity for change in the property value by updating dom by default.

### Reactive support
With reactivity dom gets update each time a property marked as **@Property** gets its value changed.

```typescript HTML
import {BaseElement} from "./base-elements";
import {BindEvent, Component, Property} from "./app.decorator";

@Component({
    selector: 'app-counter',
    shadow: false
})
export class CounterComponent extends BaseElement {

    @Property({name: 'count'})
    count!: number;

    @BindEvent({event: 'click', id: '#button'})
    increment() {
        this.count += 1;
    }

    render() {
        return `
            <div>${this.count}</div>
            <button id="button" type="submit">Click Me</button>
        `
    }

}
```

```HTML
<app-count count="0"></app-count>
```