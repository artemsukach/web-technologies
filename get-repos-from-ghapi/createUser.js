export function createUser(user) {
  const userName = document.querySelector('.main__user-nickname');
  userName.innerText = user.login || '';
  userName.setAttribute('href', user.html_url || '#');
  userName.setAttribute('target', '_blank');

  const userFollower = document.querySelector('.main__user-follower');
  userFollower.innerText = `${
    user.followers || 'no information available'
  } followers`;
}
