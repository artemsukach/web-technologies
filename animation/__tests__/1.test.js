const { EventBus } = require('./../src/task1/1');

describe('EventBus class', () => {
  let eventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  describe('on method', () => {
    test('should be defined', () => {
      expect(eventBus.on).toBeDefined();
    });
  });

  describe('emit method', () => {
    test('should be defined', () => {
      expect(eventBus.emit).toBeDefined();
    });

    test('should call callback', () => {
      const mockCallback = jest.fn((state) => {
        console.log('first state listener'); // first state listener
        console.log(state); // { newState: 'is here' }
      });

      eventBus.on('stateUpdated', mockCallback);

      eventBus.emit('stateUpdated', { newState: 'is here' });

      expect(mockCallback).toBeCalled();
    });
  });

  describe('Errors', () => {
    test('should be defined', () => {
      expect(eventBus.validateString).toBeDefined();
      expect(eventBus.validateFunction).toBeDefined();
      expect(eventBus.validateObject).toBeDefined();
      expect(eventBus.isHaveListener).toBeDefined();
    });

    test('throws error', () => {
      expect(() => {
        eventBus.validateString(1);
      }).toThrow();

      expect(() => {
        eventBus.validateFunction('function');
      }).toThrow();

      expect(() => {
        eventBus.validateObject('object');
      }).toThrow();

      expect(() => {
        eventBus.isHaveListener(undefined);
      }).toThrow();
    });
  });
});
