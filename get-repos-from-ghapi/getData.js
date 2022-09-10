import { HttpError } from './httpError.js';

async function getJSON(url = '') {
  const response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

export function getData(type, name = '') {
  switch (type) {
    case 'users':
      return getJSON(`https://api.github.com/users`);
    case 'user':
      return getJSON(`https://api.github.com/users/${name}`);
    case 'repos':
      return getJSON(`https://api.github.com/users/${name}/repos`);
  }
}
