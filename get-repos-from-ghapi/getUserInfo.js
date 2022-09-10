import { getData } from './getData.js';
import { HttpError } from './httpError.js';
import { createRepos } from './createRepos.js';
import { createUser } from './createUser.js';

export function getUserInfo(user) {
  getData('user', user.login)
    .then((data) => {
      createUser(data);
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        console.error('Not Found');
      } else {
        throw err;
      }
    });

  getData('repos', user.login)
    .then((data) => {
      createRepos(data);
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        console.error('Not Found');
      } else {
        throw err;
      }
    });
}
