import {
  BaseElement,
  EventBindCollection,
  EventBindRecord,
  EventBindType,
  EventOptionMeta
} from "@dota/core";
import {GeneralUtils} from "@dota/core/utils/GeneralUtils.ts";


export class EventManagerService<T extends BaseElement>{

  private eventBindCollection: EventBindCollection = new Map();
  private readonly instance: T

  constructor(instance: T) {
    this.instance = instance;
  }

  /**
   * Adds an event to the collection.
   *
   * @param {EventBindType} type - The type of the event (e.g., "Host", "Window").
   * @param {EventOptionMeta} record - The event option metadata.
   */
  public addEvent(type: EventBindType, record: EventBindRecord): void {
    if (!this.eventBindCollection.has(type)) {
      this.eventBindCollection.set(type, new Map<string, EventBindRecord>());
    }
    const bindRecords = this.eventBindCollection.get(type);
    if (bindRecords) {
      const key = `${record.option.event}:${record.option.method}`;
      bindRecords.set(key, record);
    }
  }

  /**
   * Retrieves an event from the collection.
   *
   * @param {EventBindType} type - The type of the event (e.g., "Host", "Window").
   * @param {string} key - The key of the event to retrieve.
   * @returns {EventOptionMeta | undefined} - The event option metadata or undefined if not found.
   */
  public getEvent(type: EventBindType, key: string): EventBindRecord | undefined {
    return this.eventBindCollection.get(type)?.get(key);
  }

  /**
   * Binds events to the given element based on the provided options and type.
   *
   * @param element - The element to which events should be bound. Must be a subclass of BaseElement.
   * @param {EventOptionMeta} option - The configuration options for the events to be bound.
   * @param {EventBindType} type - The type of binding to use when attaching events.
   * @return {void} No return value.
   */
  public bindEvent(element: HTMLElement | Window | Document | ShadowRoot, option: EventOptionMeta, type: EventBindType): void {
    const events = GeneralUtils.convertToArray(option.event);

    for (const event of events) {
      const record: EventBindRecord = {
        option: option,
        element,
        type
      };

      element.addEventListener(event, (e: Event) => option.method.call(this.instance, e));

      this.addEvent(type, record);
    }
  }

  /**
   * Unbinds events from the given element based on the provided options and type.
   *
   * @param element - The element from which events should be unbound. Must be a subclass of BaseElement.
   * @param {EventOptionMeta} option - The configuration options for the events to be unbound.
   * @param {EventBindType} type - The type of binding used when the events were attached.
   * @return {void} No return value.
   */
  public unbindEvent(element: HTMLElement | Window | Document | ShadowRoot, option: EventOptionMeta, type: EventBindType): void {
    const events = GeneralUtils.convertToArray(option.event);

    for (const event of events) {

      const key = `${event}:${option.name}`;

      const collection = this.eventBindCollection.get(type);

      if (collection && collection.has(key)) {
        const record = collection.get(key);

        if (record) {
          element.removeEventListener(event, (e: Event) => option.method.call(this.instance, e));
          collection.delete(key);
        }
      }
    }
  }
}