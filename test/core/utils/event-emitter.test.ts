import {EventEmitter} from "@src/core";


describe('EventEmitter', () => {
    it('should emit an event with the specified data', () => {
        const eventName = 'testEvent';
        const eventData = { key: 'value' };
        const eventEmitter = new EventEmitter<typeof eventData>(eventName);

        const mockCallback = jest.fn();
        window.addEventListener(eventName, mockCallback);

        eventEmitter.emit(eventData);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback.mock.calls[0][0].detail).toEqual(eventData);

        window.removeEventListener(eventName, mockCallback);
    });

    it('should emit an event from the specified root element', () => {
        const eventName = 'testEvent';
        const eventData = { key: 'value' };
        const eventEmitter = new EventEmitter<typeof eventData>(eventName);

        const mockCallback = jest.fn();
        const rootElement = document.createElement('div');
        rootElement.addEventListener(eventName, mockCallback);

        eventEmitter.emit(eventData, rootElement);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback.mock.calls[0][0].detail).toEqual(eventData);

        rootElement.removeEventListener(eventName, mockCallback);
    });

    it('should bubble the event up to the window object', () => {
        const eventName = 'testEvent';
        const eventData = { key: 'value' };
        const eventEmitter = new EventEmitter<typeof eventData>(eventName);

        const mockCallback = jest.fn();
        window.addEventListener(eventName, mockCallback);

        const rootElement = document.createElement('div');
        document.body.appendChild(rootElement);

        eventEmitter.emit(eventData, rootElement);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback.mock.calls[0][0].detail).toEqual(eventData);

        window.removeEventListener(eventName, mockCallback);
        document.body.removeChild(rootElement);
    });
});