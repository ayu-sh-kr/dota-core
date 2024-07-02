### DOTA CORE
* Templating Library for Web Components
* Provides decorators based support for Web Components

```typescript
import {HTML, Component, BaseElement, Property, EventListener} from "./index";

export class Widget extends BaseElement {

    @Propert({name: 'data'})
    data: string;

    constructor() {
        super();
    }
    
    @EventListener({name: 'click'})
    handleClick() {
        console.log('clicked')
    }
    
    render() {
        return HTML`<div>Click Me</div>`
    }
}
```