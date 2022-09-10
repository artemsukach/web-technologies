import {
  NEWS as news,
  PROMOTIONS as promo,
} from './config.js';

const promoWrapper = document.querySelector('.promo__items');
for (let el of promo) {
  createPromo(el);
}

function createPromo(el) {
  let numbers;
  const post = document.createElement('div');
  post.classList.add('promo__item');
  if (el['time_action']) {
    numbers = el['time_action'].match(/\d+/g);
  } else {
    numbers = ['00', '00', '00'];
  }
  let validNumbers = numbers.map((element) => {
    if (element.length !== 2) {
      element = '0' + element;
    }
    return element;
  });
  post.innerHTML = `
  <a href="#" class="promo__name main-link">${el.title}</a>
  <div class="promo__item-wrapper">
    <img
      class="promo__item-img"
      src="${el.img || 'https://homy.ru/upload/catalog/ip2061_medium.jpg'}"
      alt="promo"
    />
  </div>
  <p class="promo__text">
   ${el.description}
  </p>
  <div class="promo__term">
    <p class="promo__term-text">Срок действия:</p>
    <div class="promo__term-wrapper">
      <div class="promo__term-date-wrapper">
        <div class="promo__term-date-numbers">
          <div class="promo__term-date-number">${validNumbers[0][0]}</div>
          <div class="promo__term-date-number">${validNumbers[0][1]}</div>
        </div>
        <p class="promo__term-date-text">дней</p>
      </div>
      <span class="promo__term-colon">:</span>
      <div class="promo__term-date-wrapper">
        <div class="promo__term-date-numbers">
          <div class="promo__term-date-number">${validNumbers[1][0]}</div>
          <div class="promo__term-date-number">${validNumbers[1][1]}</div>
        </div>
        <p class="promo__term-date-text">часов</p>
      </div>
      <span class="promo__term-colon">:</span>
      <div class="promo__term-date-wrapper">
        <div class="promo__term-date-numbers">
          <div class="promo__term-date-number">${validNumbers[2][0]}</div>
          <div class="promo__term-date-number">${validNumbers[2][1]}</div>
        </div>
        <p class="promo__term-date-text">минут</p>
      </div>
    </div>
  </div>
  <p class="promo__info">
    <a class="promo__info-link link-info" href="${el.url}">Подробнее</a>
  </p>`;
  promoWrapper.prepend(post);
}
