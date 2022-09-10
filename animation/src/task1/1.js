/**
 * @class
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  validateString(string) {
    if (typeof string !== 'string') {
      throw new TypeError('Wrong type given, expected a string');
    }
  }

  validateFunction(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('Wrong type given, expected a function');
    }
  }

  validateObject(obj) {
    if (typeof obj !== 'object') {
      throw new TypeError('Wrong type given, expected a object');
    }
  }

  isHaveListener(property) {
    if (!property) {
      throw new Error('Event has no listener');
    }
  }

  /**
   * The method that registers listeners for custom events
   * @param {string} event - event name
   * @param {eventListener} listener - callback
   */
  on(event, listener) {
    try {
      this.validateString(event);
      this.validateFunction(listener);

      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(listener);
    } catch (e) {
      console.error(e.message);
    }
  }

  /**
   * The method that fires event
   * @param {string} event - event name
   * @param {Object} data - any data
   */
  emit(event, data) {
    try {
      this.validateString(event);
      this.validateObject(data);
      this.isHaveListener(this.listeners[event]);

      for (let listener of this.listeners[event]) {
        listener(data);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

/**
 * @callback eventListener
 * @param {Object} - data provided by emit method
 */

const eventBus = new EventBus();

eventBus.on('stateUpdated', (state) => {
  console.log('first state listener'); // first state listener
  console.log(state); // { newState: 'is here' }
});

eventBus.on('stateUpdated', (state) => {
  console.log('second state listener'); // second state listener
  console.log(state); // { newState: 'is here' }
});

eventBus.on('requestFulfilled', (data) => {
  console.log('first request listener'); // first request listener
  console.log(data); // { request: 'data' }
});

eventBus.on('foo', () => {
  console.log("this message won't be shown");
});

eventBus.emit('stateUpdated', { newState: 'is here' });
eventBus.emit('requestFulfilled', { request: 'data' });
// eventBus.emit('bar', { foo: 'bar' });

module.exports = { EventBus };
