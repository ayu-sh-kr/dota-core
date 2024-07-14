---
"@ayu-sh-kr/dota-core": patch
---

Added Docs and New Class EventEmitter for dispatching custom events.

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
