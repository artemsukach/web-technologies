import { HttpError } from './httpError.js';
import { getData } from './getData.js';
import { deleteSearchResult, deleteUserResult } from './deleteItem.js';
import { debounce } from './debounce.js';
import { hideMessage, showMessage } from './toggleMessage.js';
import { createSearchItem } from './createSearchItem.js';
import { getUserInfo } from './getUserInfo.js';

const field = document.querySelector('.search__field');
const searchButton = document.querySelector('.search__button');

searchButton.addEventListener('click', () => {
  const textInField = field.value;

  deleteSearchResult();
  deleteUserResult();

  getData('users')
    .then((data) => {
      const filteredArray = data.filter((item) => item.login === textInField);

      if (filteredArray.length === 1) {
        getUserInfo(filteredArray[0]);
      } else {
        showMessage();
      }

      deleteSearchResult();
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        console.error('Not Found');
      } else {
        throw err;
      }
    });
});

field.addEventListener(
  'input',
  debounce(function () {
    const textInField = field.value;

    hideMessage();
    deleteSearchResult();
    deleteUserResult();

    getData('users')
      .then((data) => {
        const filteredArray = data.filter((item) =>
          item.login.startsWith(textInField)
        );

        if (filteredArray.length === 0) {
          showMessage();
        } else {
          createSearchItem(filteredArray);
        }
      })
      .catch((err) => {
        if (err instanceof HttpError && err.response.status == 404) {
          console.error('Not Found');
        } else {
          throw err;
        }
      });
  }, 500)
);

// function getUsers() {
//   getData('users')
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//     .catch((err) => {
//       if (err instanceof HttpError && err.response.status == 404) {
//         console.error('Not Found');
//       } else {
//         throw err;
//       }
//     });
// }
