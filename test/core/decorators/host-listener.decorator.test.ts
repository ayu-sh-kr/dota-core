import {BaseElement, Component} from "@src/core";
import {HostListener} from "@src/core/decorators/host-listener.decorator.ts";


describe('HostListenerDecorator', () => {
    it('should  bind the method to the specified event', () => {
        const mockMethod = jest.fn();

        @Component({
            selector: 'test-component',
            shadow: false
        })
        class TestComponent extends BaseElement{

            constructor() {
                super();
            }

            @HostListener({event: 'click'})
            handleClick(event: Event) {
                mockMethod(event)
            }

            render(): string {
                return "";
            }
        }

        const testComponent = new TestComponent()
        const event = new Event('click');
        testComponent.handleClick(event);

        expect(mockMethod).toHaveBeenCalledWith(event);
    });
});