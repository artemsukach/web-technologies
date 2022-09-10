const { moveElement } = require('../src/script');

describe('moveElement function', () => {
  test('should be defined', () => {
    expect(moveElement).toBeDefined();
  });

  test('data-wrapper is matches', () => {
    return moveElement(document.querySelector('.together__blue-circle')).then(
      (dataWrapper) => {
        expect(dataWrapper).toBe('together');
      }
    );
  });

  test('throws error', () => {
    expect(() => {
      moveElement(`document.querySelector('.together__blue-circle')`);
    }).toThrow();

    const dataItem = document.querySelector('.together__blue-circle').dataset
      .item;
    const elementPlace = document.querySelector(
      `.circle-place[data-item="${dataItem}"]`
    );
    elementPlace.remove();

    expect(() => {
      moveElement(document.querySelector('.together__blue-circle'));
    }).toThrow();

  });
});

