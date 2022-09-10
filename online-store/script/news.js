import {
  NEWS as news,
} from './config.js';

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Ноябрь',
  'Октябрь',
  'Декабрь'
];

const newsWrapper = document.querySelector('.news__posts-wrapper');

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
}

const newsList = getRandom(news, 3);

for (let el of newsList) {
  let date = new Date(el.date);
  let day = date.getDate();
  let month = months[date.getMonth()];

  createNews(el, day, month);

}

function createNews(el, day, month) {
  const post = document.createElement('div');
  post.classList.add('news__posts-item');
  post.innerHTML = `
  <div class="news__date-wrapper">
    <img
      src="${el.img}"
      alt="news"
      class="news__date-img"
    />
    <span class="news__date-number">${day}</span>
    <p class="news__date-month">${month}</p>
  </div>
  <div class="news__posts-text-wrapper">
    <a class="news__posts-title" href="#"
      >${el.title}</a
    >
    <p class="news__posts-text">
    ${el.description}
    </p>
  </div>`;
  newsWrapper.prepend(post);
}
