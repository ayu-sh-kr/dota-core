---
"@ayu-sh-kr/dota-core": minor
---

Modified BaseElement to bind events from template element to template itself

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
