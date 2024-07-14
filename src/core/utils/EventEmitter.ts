
export class EventEmitter<T> {

    constructor(private name: string) {
    }
    emit(data: T, root?: HTMLElement) {
        const event = new CustomEvent<T>(this.name, {
            bubbles: true,
            detail: data
        })

        if(root) {
            root.dispatchEvent(event);
        }
        else window.dispatchEvent(event);
    }
}