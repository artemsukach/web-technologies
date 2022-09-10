import { deleteSearchResult } from './deleteItem.js';
import { getUserInfo } from './getUserInfo.js';

export function createSearchItem(users) {
  const searchList = document.querySelector('.search__list');
  deleteSearchResult();
  let counter = 0;
  for (let user of users) {
    counter++;
    if (counter >= 10) {
      break;
    }
    const searchItem = document.createElement('li');
    searchItem.classList.add('search__item');

    searchItem.innerText = `${user.login || ''}`;

    searchList.append(searchItem);

    searchItem.addEventListener('click', () => {
      deleteSearchResult();
      getUserInfo(user);
    });
  }
}
