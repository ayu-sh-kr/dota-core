---
"@ayu-sh-kr/dota-core": patch
---

Added Decorator AfterInit -> Run methods after view initialization

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
