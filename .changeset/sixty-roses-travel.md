---
"@ayu-sh-kr/dota-core": minor
---

Added EventListener decorator to map Component Events Directly to Component Method

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