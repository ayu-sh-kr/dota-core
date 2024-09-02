---
"@ayu-sh-kr/dota-core": patch
---

Added Type Sanitization for the Property types

```typescript

export class TestComponent extends BaseElement {

    @Property({
        name: 'data',
        type: NumberType
    })
    data!: number

    constructor() {
        super();
    }

    render() {
        return ``;
    }
}
```
