export function deleteSearchResult() {
  const searchList = document.querySelector('.search__list');
  searchList.innerHTML = ``;
}

export function deleteUserResult() {
  const nickname = document.querySelector('.main__user-nickname');
  const followers = document.querySelector('.main__user-follower');
  const reposList = document.querySelector('.main__user-repos');

  nickname.innerHTML = ``;
  followers.innerHTML = ``;
  reposList.innerHTML = ``;
}
