function moveElement(element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Wrong type given, expected a DOM element');
  }
  const dataItem = element.dataset.item;
  const elementPlace = document.querySelector(
    `.circle-place[data-item="${dataItem}"]`
  );
  const posY = elementPlace.offsetTop - element.offsetTop;
  const posX = elementPlace.offsetLeft - element.offsetLeft;
  const dataWrapper = element.parentNode.dataset.wrapper;

  if (!elementPlace || !dataWrapper) {
    throw new Error('Element does not exist');
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof posX !== 'number' || typeof posY !== 'number') {
        reject(new TypeError('Wrong type given, expected a number'));
      }

      element.style.transform = `translate(${posX}px,${posY}px)`;

      element.addEventListener('transitionend', function handler() {
        element.removeEventListener('transitionend', handler);
        resolve(dataWrapper);
      });
    }, 0);
  });
}

Promise.all([
  moveElement(document.querySelector('.together__blue-circle')),
  moveElement(document.querySelector('.together__red-circle')),
  moveElement(document.querySelector('.together__green-circle')),
])
  .then((dataWrapper) => {
    const success = document.querySelector(
      `.success[data-wrapper="${dataWrapper[0]}"]`
    );

    success.classList.add('show');
  })
  .catch((e) => console.error(e.message));

moveElement(document.querySelector('.alternately__blue-circle'))
  .then(() => {
    return moveElement(document.querySelector('.alternately__red-circle'));
  })
  .then(() => {
    return moveElement(document.querySelector('.alternately__green-circle'));
  })
  .then((dataWrapper) => {
    const success = document.querySelector(
      `.success[data-wrapper="${dataWrapper}"]`
    );

    success.classList.add('show');
  })
  .catch((e) => console.error(e.message));

module.exports = { moveElement };
