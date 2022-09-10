import {
  CURRENCY,
  CURRENCY_EXCHANGE,
  BASKET,
  TOP_MENU,
  MENU,
  NEWS,
  BANNER,
  ITEMS,
  PROMOTIONS,
  BUYING_RIGHT_NOW,
} from './config.js';

const img = [];
const link = [];

const prev = document.querySelector('.news__left-arrow-button');
const next = document.querySelector('.news__right-arrow-button');
const dotsList = document.querySelector('.news__banner-navigation');
let bannerList = BANNER.sort(sortByField('order'));

createDots(dotsList);

function createDots(list) {
  for (let i = 0; i < bannerList.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('news__banner-navigation-item');
    dot.innerHTML = `<button class="news__banner-navigation-btn button--cursor--pointer"></button>`;
    list.append(dot);
  }
}

const dots = document.querySelectorAll('.news__banner-navigation-item');
dots.forEach((item, indexDot) => {
  item.addEventListener('click', () => {
    index = indexDot;
    banner.style.backgroundImage = `url("${img[index]}")`;
    activeDot(index);
  });
});
let index = 0;
activeDot(index);

const banner = document.querySelector('.news__banner-wrapper');
const linkBtn = document.querySelector('.news__banner-link');

for (let el of bannerList) {
  img.push(el.img);
  link.push(el.url);
}
linkBtn.href = link[index];

banner.style.backgroundImage = `url("${img[0]}")`;

function activeDot(index) {
  for (let el of dots) {
    el.querySelector('.news__banner-navigation-btn').classList.remove(
      'active-dot'
    );
  }
  dots[index]
    .querySelector('.news__banner-navigation-btn')
    .classList.add('active-dot');
}

function sortByField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

prev.addEventListener('click', prevInfinitySlide);
next.addEventListener('click', nextInfinitySlide);

function nextInfinitySlide() {
  if (index === bannerList.length - 1) {
    index = 0;
    banner.style.backgroundImage = `url("${img[index]}")`;
    activeDot(index);
    linkBtn.href = link[index];
  } else {
    index++;
    banner.style.backgroundImage = `url("${img[index]}")`;
    activeDot(index);
    linkBtn.href = link[index];
  }
}

function prevInfinitySlide() {
  if (index === 0) {
    index = bannerList.length - 1;
    banner.style.backgroundImage = `url("${img[index]}")`;
    activeDot(index);
    linkBtn.href = link[index];
  } else {
    index--;
    banner.style.backgroundImage = `url("${img[index]}")`;
    activeDot(index);
    linkBtn.href = link[index];
  }
}

let timer = setInterval(nextInfinitySlide, 5000);

banner.onmouseover = function(event) {
  clearInterval(timer);
};


// banner.innerHTML = `
// <p class="news__banner-text">
//   <span class="news__banner-text--orange"
//     >РЕВОЛЮЦИОННОЕ РЕШЕНИЕ</span
//   ><br />
//   НА РІНКЕ СРЕДИ СИСТЕМ ВКС!<br />
//   <span class="news__baner-text--style--italic"
//     >GVC 3200 ОТ КОМПАНИИ GRANDSTREAM ЭТО:</span
//   >
// </p>
// <ul class="news__banner-list">
//   <li class="news__banner-list-item">
//     9-ти сторонняя аудио/видео конференция без покупки
//     дополнительного ПО
//   </li>
//   <li class="news__banner-list-item">
//     2 Мпикс камера CMOS с разрешением 1920Hx1080V@15fps
//   </li>
//   <li class="news__banner-list-item">
//     Гигабитный порт, встроенный модуль WiFi (802.11п) и
//     Bluetooth 4.0, Miracast
//   </li>
// </ul>
// <a href="#" class="news__banner-link">ПОДРОБНЕЕ</a>
// `;
