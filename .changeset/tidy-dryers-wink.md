---
"@ayu-sh-kr/dota-core": patch
---

Added @Output decorator to initialize EventEmitters

```typescript
import {AfterInit, BaseElement, Component, EventEmitter} from "./index";
import {Output} from "./output.decorator";

@Component({
    selector: 'tidy-dryers',
    shadow: false
})
export class TidyDryersWink extends BaseElement {

    @Output()
    color!: EventEmitter<string>

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
