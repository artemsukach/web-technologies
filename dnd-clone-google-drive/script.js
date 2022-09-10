(function () {
  'use strict';

  /**
   * Function that calculates the optimal width for each element
   *
   * @return {number} Returns the width of element
   */
  function getWidth() {
    let driveWidth = drive.offsetWidth - 40;
    let countOfItems = Math.floor(driveWidth / 125);
    let itemWidth =
      125 + (driveWidth - (125 + 32) * countOfItems) / countOfItems;

    return itemWidth;
  }

  /**
   * Function that sets the width of elements.
   */
  function setWidth() {
    let width = getWidth();
    let items = getItems();

    items.forEach((item) => {
      item.style.width = `${width}px`;
    });
  }

  function getItems() {
    return document.querySelectorAll('.drive__item');
  }

  /**
   * Function to check if we clicked inside an element with a particular class
   * name.
   *
   * @param {Object} e The event
   * @param {String} className The class name to check against
   * @return {Boolean}
   */
  function clickInsideElement(e, className) {
    let el = e.target;

    if (el.classList.contains(className)) {
      return el;
    } else {
      while ((el = el.parentNode)) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }

  /**
   * Get's exact position of event.
   *
   * @param {Object} e The event passed in
   * @return {Object} Returns the x and y position
   */
  function getPosition(e) {
    let posx = 0;
    let posy = 0;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy,
    };
  }

  /**
   * variables
   */
  let contextMenuLinkClassName = 'context-menu__link';
  let contextMenuActive = 'context-menu--active';

  let fileItemClassName = 'drive__item';

  let fileItemInContext;

  let clickCoords;
  let clickCoordsX;
  let clickCoordsY;

  let menu = document.querySelectorAll('.context-menu');
  let menuFile = document.querySelector('#context-menu-file');
  let menuMain = document.querySelector('#context-menu-main');
  let drive = document.querySelector(`.drive`);

  let itemMenuState = 0;
  let mainMenuState = 0;
  let menuWidth;
  let menuHeight;

  let windowWidth;
  let windowHeight;

  let fileList = getItems();

  /**
   * Initialise our application's code.
   */
  function init() {
    setWidth();
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
    setDraggable(fileList);
    dragStartListener();
    dragEndListener();
    dragoverListener();
  }

  /**
   * Listens for contextmenu events.
   */
  function contextListener() {
    document.addEventListener('contextmenu', function (e) {
      fileItemInContext = clickInsideElement(e, fileItemClassName);

      if (fileItemInContext) {
        e.preventDefault();
        toggleItemMenuOff();
        toggleItemMenuOn();
        positionMenu(e);
      } else {
        fileItemInContext = document.querySelector('body');
        e.preventDefault();
        toggleItemMenuOff();
        toggleDriveMenuOn();
        positionMenu(e);
      }
    });
  }

  /**
   * Listens for click events.
   */
  function clickListener() {
    document.addEventListener('click', function (e) {
      let clickElIsLink = clickInsideElement(e, contextMenuLinkClassName);

      if (clickElIsLink) {
        e.preventDefault();
        menuItemListener(e, clickElIsLink);
      } else {
        let button = e.which || e.button;
        if (button === 1) {
          toggleItemMenuOff();
        }
      }
    });
  }

  /**
   * Listens for keyup events.
   */
  function keyupListener() {
    window.onkeyup = function (e) {
      if (e.keyCode === 27) {
        toggleItemMenuOff();
      }
    };
  }

  /**
   * Window resize event listener
   */
  function resizeListener() {
    window.onresize = function () {
      setWidth();
      toggleItemMenuOff();
    };
  }

  /**
   * Turns the custom context menu on.
   */
  function toggleItemMenuOn() {
    if (itemMenuState !== 1) {
      itemMenuState = 1;
      menuFile.classList.add(contextMenuActive);
    }
  }

  /**
   * Turns the custom context menu on.
   */
  function toggleDriveMenuOn() {
    if (mainMenuState !== 1) {
      mainMenuState = 1;
      menuMain.classList.add(contextMenuActive);
    }
  }

  /**
   * Turns the custom context menu off.
   */
  function toggleItemMenuOff() {
    if (itemMenuState !== 0) {
      itemMenuState = 0;
      menuFile.classList.remove(contextMenuActive);
    }

    if (mainMenuState !== 0) {
      mainMenuState = 0;
      menuMain.classList.remove(contextMenuActive);
    }
  }

  /**
   * Positions the menu properly.
   *
   * @param {Object} e The event
   */
  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menu.forEach((item) => {
      menuWidth = item.offsetWidth + 4;
      menuHeight = item.offsetHeight + 4;
    });

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if (windowWidth - clickCoordsX < menuWidth) {
      menu.forEach((item) => {
        item.style.left = windowWidth - menuWidth + 'px';
      });
    } else {
      menu.forEach((item) => {
        item.style.left = clickCoordsX + 'px';
      });
    }

    if (windowHeight - clickCoordsY < menuHeight) {
      menu.forEach((item) => {
        item.style.top = windowHeight - menuHeight + 'px';
      });
    } else {
      menu.forEach((item) => {
        item.style.top = clickCoordsY + 'px';
      });
    }
  }

  /**
   * Dummy action function that logs an action when a menu item link is clicked
   *
   * @param {HTMLElement} link The link that was clicked
   */
  function menuItemListener(e, link) {
    fileAction(
      e,
      link.getAttribute('data-action'),
      fileItemInContext.getAttribute('data-id')
    );
    setWidth();
    toggleItemMenuOff();
  }

  /**
   * Function get free id for item
   *
   * @return {number} id for item
   */
  function getId() {
    let items = getItems();
    let arrOfId = [...items].map((item) => item.getAttribute('data-id'));
    let maxId = getMaxOfArray(arrOfId);
    return maxId + 1;
  }

  /**
   * Function get max element of array
   *
   * @return {number} max element
   */

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  /**
   * Function to execute the context menu option
   *
   */

  function fileAction(e, action, id) {
    let element = document.querySelector(`.drive__item[data-id="${id}"]`);
    let actionList = {
      rename: () => (element.innerHTML = prompt('New file name: ')),
      delete: () => element.remove(),
      create: () => {
        let file = document.createElement('div');
        file.classList.add('drive__item');
        file.setAttribute('data-id', getId());
        file.innerHTML = prompt('Create new file. Please, enter the name: ');
        drive.append(file);
      },
    };
    actionList[action]();
    let items = getItems();
    setWidth();
    setDraggable(items);
  }

  /**
   * The function that sets an draggable attribute to an element
   *
   * @param {NodeList} items The list of items
   */

  function setDraggable(items) {
    items.forEach((item) => (item.draggable = true));
  }

  /**
   * Listens for dragstart events.
   *
   */

  function dragStartListener() {
    drive.addEventListener(`dragstart`, (e) => {
      e.target.classList.add(`selected`);
    });
  }

  /**
   * Listens for dragend events.
   *
   */

  function dragEndListener() {
    drive.addEventListener(`dragend`, (e) => {
      e.target.classList.remove(`selected`);
    });
  }

  /**
   * Listens for dragover events.
   *
   */

  function dragoverListener() {
    drive.addEventListener(`dragover`, (e) => {
      e.preventDefault();

      const activeElement = drive.querySelector(`.selected`);
      const currentElement = e.target;
      const isMoveable =
        activeElement !== currentElement &&
        currentElement.classList.contains(`drive__item`);

      if (!isMoveable) {
        return;
      }

      const nextElement = getNextElement(e.clientX, currentElement);

      if (
        (nextElement && activeElement === nextElement.previousElementSibling) ||
        activeElement === nextElement
      ) {
        return;
      }

      drive.insertBefore(activeElement, nextElement);
    });
  }

  /**
   * Function get next element
   *
   * @param {number} cursorPosition vertical coordinate of the cursor
   *
   * @param {HTMLElement} currentElement current element which triggered the dragover event
   *
   * @return {HTMLElement} next element
   */
  function getNextElement(cursorPosition, currentElement) {
    const currentElementCoord = currentElement.getBoundingClientRect();

    const currentElementCenter =
      currentElementCoord.x + currentElementCoord.width / 2;

    const nextElement =
      cursorPosition < currentElementCenter
        ? currentElement
        : currentElement.nextElementSibling;

    return nextElement;
  }

  /*Selection*/

  // let x1 = 0,
  //   y1 = 0,
  //   x2 = 0,
  //   y2 = 0;
  // let canDrawSelection = false;
  // let selection = document.querySelector('.selection');
  // let selectionPosition;
  // let selectionSize;
  // mousedownListener();
  // mouseupListener();
  // mousemoveListener();

  // function mousedownListener() {
  //   drive.addEventListener('mousedown', function (e) {
  //     selection.classList.remove('selection--hide');
  //     canDrawSelection = true;
  //     x1 = e.clientX;
  //     y1 = e.clientY;
  //     x2 = e.clientX;
  //     y2 = e.clientY;
  //     selection.style.top = `${y1}px`;
  //     selection.style.left = `${x1}px`;
  //   });
  // }

  // function mouseupListener() {
  //   drive.addEventListener('mouseup', function () {
  //     selection.classList.add('selection--hide');
  //     selection.style.position = 'fixed';
  //     canDrawSelection = false;
  //     setHighlightedAtribute();
  //   });
  // }

  // function setHighlightedAtribute() {
  //   let items = Array.from(getItems());
  //   let itemCenter = getWidth() / 2;
  //   let canWidth = selectionSize.w;
  //   let canHeight = selectionSize.h;

  //   for (let i of items) {
  //     if (
  //       position(i).posX + itemCenter > selectionPosition.x &&
  //       position(i).posX + itemCenter < selectionPosition.x + canWidth &&
  //       position(i).posY + i.clientHeight / 2 > selectionPosition.y &&
  //       position(i).posY + i.clientHeight / 2 < selectionPosition.y + canHeight
  //     ) {
  //       i.classList.add('highlighted');
  //     }
  //   }
  // }

  // function position(element) {
  //   var posX = element.offsetLeft;
  //   var posY = element.offsetTop;
  //   return { posX, posY };
  // }

  // function mousemoveListener() {
  //   drive.addEventListener('mousemove', function (e) {
  //     x2 = e.clientX;
  //     y2 = e.clientY;

  //     if (canDrawSelection) {
  //       if (x2 < x1 && y2 < y1) {
  //         selection.style.top = `${y2}px`;
  //         selection.style.left = `${x2}px`;
  //         selectionPosition = { x: x2, y: y2 };
  //       }
  //       if (x2 > x1 && y2 > y1) {
  //         selection.style.top = `${y1}px`;
  //         selection.style.left = `${x1}px`;
  //         selectionPosition = { x: x1, y: y1 };
  //       }
  //       if (x2 > x1 && y2 < y1) {
  //         selection.style.top = `${y2}px`;
  //         selection.style.left = `${x1}px`;
  //         selectionPosition = { x: x1, y: y2 };
  //       }
  //       if (x2 < x1 && y2 > y1) {
  //         selection.style.top = `${y1}px`;
  //         selection.style.left = `${x2}px`;
  //         selectionPosition = { x: x2, y: y1 };
  //       }
  //     }
  //     selectionSize = drawSelection();
  //   });
  // }

  // function drawSelection() {
  //   if (canDrawSelection === true) {
  //     selection.style.width = `${Math.abs(x2 - x1)}px`;
  //     selection.style.height = `${Math.abs(y2 - y1)}px`;
  //     return { w: Math.abs(x2 - x1), h: Math.abs(y2 - y1) };
  //   }
  // }

  /**
   * Run the app.
   */
  init();
})();
