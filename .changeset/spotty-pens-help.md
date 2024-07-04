---
"@ayu-sh-kr/dota-core": patch
---

Fix property bind procedure

```typescript

@Component({
    selector: 'text-component'
})
export class TextComponent extends BaseElement {
    
    @Property({name: 'text'})
    text!: string;
    
    render() {
        return HTML`
        <div>${this.text}</div>
        `
    }
}
```

```html
<text-component text="Text to render"></text-component>
```

Now if we want the attribute name to be different

```typescript
@Component({
    selector: 'text-component'
})
export class TextComponent extends BaseElement {

    @Property({name: 'data'})
    text!: string;

    render() {
        return HTML`
        <div>${this.text}</div>
        `
    }
}
```

```html
<text-component data="Text to render"></text-component>
```
