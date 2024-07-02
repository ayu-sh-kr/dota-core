---
"@ayu-sh-kr/dota-core": patch
---

Fix bugs and added new features

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

* Adding @Expose to method of class will expose them to global space.
* Fix @Component, now shadow parameter will attach shadow root based on its value.
