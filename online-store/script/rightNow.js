import {
  PROMOTIONS as promo,
  BUYING_RIGHT_NOW as rightNow,
} from './config.js';

const rightNowWrapper = document.querySelector('.buy-now__items');

for(let i = 0; i<4;i++){
  createRightNow(rightNow[i]);
}
function createRightNow(el) {
  const item = document.createElement('div');
  item.classList.add('buy-now__item');
  item.innerHTML = ` 
  <img src="${el.img}" alt="lock" class="buy-now__img" />
  <div class="buy-now__text">
    <a href="${el.url}" class="byu-now__name main-link"
      >${el.title}</a
    >
  </div>`;
  rightNowWrapper.append(item);
}
