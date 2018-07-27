class Events {
  /**
   * variable for holding all event arrays
   */
  private events: any = [];

  /**
   * method for registering custom event handler
   * @param eventName event name
   * @param callback handler function
   */
  public on(eventName: EventKeywords, callback: Function) {
    if (!EventKeywords[eventName]) throw Error("invalid event type!");
    if (!this.events[eventName]) this.events[eventName] = [];
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    }
  }

  /**
   * method triggers any specific event
   * @param eventName event name
   * @param data payload
   */
  public trigger(eventName: EventKeywords, data: any = null) {
    let key = EventKeywords[eventName];
    if (this.events[key]) {
      this.events[key].forEach((e: any) => {
        e(data);
      });
    }
  }

  /**
   * method for removing all the event handlers based on the event name
   * @param eventName event name
   */
  public removeAll(eventName: EventKeywords) {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }

  /**
   * * method for removing specific event handlers based on the event name
   * @param eventName event name
   * @param callback handler function
   */
  public remove(eventName: EventKeywords, callback: Function) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((e: any) => {
        delete this.events[eventName];
      });
    }
  }
}

/**
 * Event Keywords enum
 * @class
 */
export enum EventKeywords {
  onstop,
  onplay,
  onpause,
  onend,
  onnext,
  onprevious,
  onmute,
  ontimeupdate,
  onunmute,
  onendofplaylist,
  onerror
}
export default Events;
