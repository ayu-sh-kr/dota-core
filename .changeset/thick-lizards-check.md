---
"@ayu-sh-kr/dota-core": patch
---

Did some code refactoring for export and added new decorator @BeforeInit

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
