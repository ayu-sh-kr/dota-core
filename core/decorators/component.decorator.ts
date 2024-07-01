

export interface ComponentConfig {
    selector: string;
    shadow?: boolean
}

export function Component(config: ComponentConfig): ClassDecorator{
    return function (target: any) {
        customElements.define(config.selector, target);
    }
}