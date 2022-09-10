import {
  CURRENCY as currencytext,
  CURRENCY_EXCHANGE as currencyExchange,
  BASKET,
  MENU,
  ITEMS,
} from './config.js';

const countItems = document.querySelector('.info__basket-text-link');
const allPrice = document.querySelector('.info__basket-text-span');

renderMenu();
createBasket();

const menuItems = document.querySelectorAll('.info__item');

menuRightButtonListener();
menuLeftButtonListener();

function renderMenu() {
  const menuList = document.querySelector('.info__list');
  const arrowRight = document.querySelector('.info__item-arrow-right');

  let menuArray = Array.from(MENU.sort(sortByField('order')));

  for (let i = 0; i < menuArray.length; i++) {
    const listItem = document.createElement('li');
    const itemLink = document.createElement('a');

    listItem.classList.add('info__item');
    itemLink.href = `${menuArray[i]['url']}`;
    itemLink.classList.add('info__item-link');
    itemLink.innerHTML = `${menuArray[i]['title']}`;
    listItem.append(itemLink);
    menuList.insertBefore(listItem, arrowRight);

    if (i < 10) {
      setActive(listItem);
    }
  }
}

const newItemsNaming = {
  classPrefix: 'new-items',
  labelBgName: 'green',
  labelName: 'NEW',
};

const recommendNaming = {
  classPrefix: 'recommend',
  labelBgName: 'yellow',
  labelName: 'like',
};

const saleNaming = {
  classPrefix: 'sale',
  labelBgName: 'blue',
  labelName: 'percent',
};

function InfoForRenderCatalog(arr, naming) {
  this.classPrefix = naming.classPrefix;
  this.labelBgName = naming.labelBgName;
  this.labelName = naming.labelName;
  this.itemImg = arr.img || './img/mobile-black.jpg';
  this.itemUrl = arr.url;
  this.description = arr.description;
  this.currentPrice = arr.price || 'нет в наличии';
  this.oldPrice = arr.oldPrice || '';
  this.currency = arr.currency || 1;
}

renderNewItems();
renderRecommended();
renderSale();

catalogRightButtonListener();
catalogLeftButtonListener();

function renderNewItems() {
  const arrOfItems = getByType('new');
  const sortedArrOfItems = arrOfItems.sort(sortByField('date'));

  for (let i = 0; i < sortedArrOfItems.length; i++) {
    let newItems = new InfoForRenderCatalog(
      sortedArrOfItems[i],
      newItemsNaming
    );
    renderCatalog(
      newItems.classPrefix,
      newItems.labelBgName,
      newItems.labelName,
      newItems.itemImg,
      newItems.itemUrl,
      newItems.description,
      newItems.currentPrice,
      newItems.oldPrice,
      newItems.currency,
      i
    );
  }

  if (sortedArrOfItems.length > 4) {
    document
      .querySelector('.new-items__right-arrow-button')
      .classList.add('active-flex');
  }
}

function renderRecommended() {
  const arrOfItems = getByType('recommended');
  const sortedArrOfItems = arrOfItems.sort(sortByField('price'));

  for (let i = 0; i < sortedArrOfItems.length; i++) {
    let recommend = new InfoForRenderCatalog(
      sortedArrOfItems[i],
      recommendNaming
    );
    renderCatalog(
      recommend.classPrefix,
      recommend.labelBgName,
      recommend.labelName,
      recommend.itemImg,
      recommend.itemUrl,
      recommend.description,
      recommend.currentPrice,
      recommend.oldPrice,
      recommend.currency,
      i
    );
  }
  if (sortedArrOfItems.length > 4) {
    document
      .querySelector('.recommend__right-arrow-button')
      .classList.add('active-flex');
  }
}

function renderSale() {
  const arrOfItems = getByType('sale');
  const sortedArrOfItems = arrOfItems.sort(
    (a, b) => b.oldPrice - b.price - (a.oldPrice - a.price)
  );

  for (let i = 0; i < sortedArrOfItems.length; i++) {
    let sale = new InfoForRenderCatalog(sortedArrOfItems[i], saleNaming);
    renderCatalog(
      sale.classPrefix,
      sale.labelBgName,
      sale.labelName,
      sale.itemImg,
      sale.itemUrl,
      sale.description,
      sale.currentPrice,
      sale.oldPrice,
      sale.currency,
      i
    );
  }
  if (sortedArrOfItems.length > 4) {
    document
      .querySelector('.sale__right-arrow-button')
      .classList.add('active-flex');
  }
}

function renderCatalog(
  classPrefix,
  labelBgName,
  labelName,
  itemImg,
  itemUrl,
  description,
  currentPrice,
  oldPrice,
  currency,
  index
) {
  const catalogList = document.querySelector(`.${classPrefix}__items`);
  const arrowRight = document.querySelector(
    `.${classPrefix}__right-arrow-button `
  );
  const arrowLeft = document.querySelector(
    `.${classPrefix}__left-arrow-button `
  );

  const catalogItem = document.createElement('div');
  catalogItem.classList.add(`${classPrefix}__item`);
  catalogItem.classList.add('catalog__item');
  catalogItem.classList.add(`${classPrefix}-test`);

  catalogItem.innerHTML = `
    <div class="${classPrefix}__label catalog__label">
      <img
        src="./img/${labelBgName}-label.svg"
        alt="label"
        class="${classPrefix}__label-img catalog__label-img"
      />
      <img
        src="./img/${labelName}.svg"
        alt="label"
        class="${classPrefix}__label-text catalog__label-text"
      />
    </div>
    <div class="${classPrefix}__item-wrapper catalog__item-wrapper">
      <img
        class="${classPrefix}__item-img catalog__item-img"
        src="${itemImg}"
        alt="item"
      />
    </div>
    <div class="${classPrefix}__item-info catalog__item-info">
      <a href="${itemUrl}" class="${classPrefix}__product-link main-link"
        >${description}</a
      >
      <div class="catalog__item-info-wrapper">
        <p class="${classPrefix}__price catalog__price">
          Цена:<span
            class="${classPrefix}__current-price catalog__current-price"
            >${convert(currentPrice, currency)}</span
          ><span
            class="${classPrefix}__previous-price catalog__previous-price"
            >${convert(oldPrice, currency)}</span
          >
        </p>
        <div class="${classPrefix}__buy-wrapper catalog__buy-wrapper">
          <button class="${classPrefix}__btn catalog__btn"
            ><img
              class="${classPrefix}__img catalog__img"
              src="./img/white-cart.svg"
              alt="cart"
            />КУПИТЬ</button
          >
          <a href="${itemUrl}" class="${classPrefix}__info-link link-info"
            >Подробнее</a
          >
        </div>
      </div>
    </div>`;

  catalogList.insertBefore(catalogItem, arrowRight);

  catalogItem
    .querySelector(`.${classPrefix}__btn`)
    .addEventListener('click', () => {
      BASKET.elements++;
      BASKET.price += +(currentPrice * currencyExchange[currency]).toFixed();
      createBasket(BASKET.elements, BASKET.price + ' ' + currencytext);
    });

  if (index < 4) {
    setActive(catalogItem);
  }
}

function catalogRightButtonListener() {
  const arrowRightBtn = document.querySelectorAll(
    '.catalog__right-arrow-button'
  );
  const smallArrowRightBtn = document.querySelectorAll(
    '.section__top-arrow-right-wrapper'
  );
  const newItem = document.querySelectorAll('.new-items-test');
  const recommend = document.querySelectorAll('.recommend-test');
  const sale = document.querySelectorAll('.sale-test');
  const listOfType = [newItem, recommend, sale];
  for (let i = 0; i < arrowRightBtn.length; i++) {
    arrowRightBtn[i].addEventListener('click', () => nextSlide(listOfType[i]));
    smallArrowRightBtn[i].addEventListener('click', () =>
      nextSlide(listOfType[i])
    );
  }
}

function catalogLeftButtonListener() {
  const arrowLeftBtn = document.querySelectorAll('.catalog__left-arrow-button');
  const smallArrowLeftBtn = document.querySelectorAll(
    '.section__top-arrow-left-wrapper'
  );
  const newItem = document.querySelectorAll('.new-items-test');
  const recommend = document.querySelectorAll('.recommend-test');
  const sale = document.querySelectorAll('.sale-test');
  const listOfType = [newItem, recommend, sale];
  for (let i = 0; i < arrowLeftBtn.length; i++) {
    arrowLeftBtn[i].addEventListener('click', () => prevSlide(listOfType[i]));
    smallArrowLeftBtn[i].addEventListener('click', () =>
      prevSlide(listOfType[i])
    );
  }
}

function menuRightButtonListener() {
  const arrowRightBtn = document.getElementById('info__item-link-arrow-right');
  arrowRightBtn.addEventListener('click', () => nextSlide(menuItems));
}

function menuLeftButtonListener() {
  const arrowLeftBtn = document.getElementById('info__item-link-arrow-left');
  arrowLeftBtn.addEventListener('click', () => prevSlide(menuItems));
}

function nextSlide(arr) {

  let lastIndex = getLastActive(arr);
  let firstIndex = getFirstActive(arr);

  if (lastIndex === arr.length - 3) {
    removeActive(arr[arr.length - 1]);
  }
  if (firstIndex === 1) {
    setActive(arr[0]);
  }
  removeActive(arr[firstIndex]);
  setActive(arr[lastIndex + 1]);
  firstIndex++;
  lastIndex++;
}

function prevSlide(arr) {
  let lastIndex = getLastActive(arr);
  let firstIndex = getFirstActive(arr);
  if (firstIndex === 2) {
    removeActive(arr[0]);
  }
  if (lastIndex === arr.length - 2) {
    setActive(arr[arr.length - 1]);
  }
  removeActive(arr[lastIndex]);
  setActive(arr[firstIndex - 1]);
  firstIndex--;
  lastIndex--;
}

function removeActive(item) {
  item.classList.remove('active-flex');
}

function setActive(item) {
  item.classList.add('active-flex');
}

function sortByField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

function getByType(type) {
  return ITEMS.filter((item) => item.type === type);
}

function getFirstActive(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].classList.contains('active-flex')) {
      return i;
    }
  }
}

function getLastActive(arr) {
  let reverseArr = Array.from(arr).reverse();
  for (let i = 1; i < reverseArr.length; i++) {
    if (reverseArr[i].classList.contains('active-flex')) {
      return reverseArr.length - i - 1;
    }
  }
}

function convert(price, curren) {
  if (price === 'нет в наличии') {
    return 'нет в наличии';
  } else if (price) {
    price = price * currencyExchange[curren];
    return price.toFixed() + ' ' + currencytext;
  }
  return '';
}

function createBasket(count = 0, price = 0) {
  countItems.innerHTML = count;
  allPrice.innerHTML = price;
}
