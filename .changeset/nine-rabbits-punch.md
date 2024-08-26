---
"@ayu-sh-kr/dota-core": minor
---

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
