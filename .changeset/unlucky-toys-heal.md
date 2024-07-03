---
"@ayu-sh-kr/dota-core": minor
---

Added Feature for Method Binding to Event and Element


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
