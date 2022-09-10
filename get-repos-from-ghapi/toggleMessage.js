export function showMessage() {
  const userNotExist = document.querySelector('.main__message');
  userNotExist.classList.remove('hide');
}

export function hideMessage() {
  const userNotExist = document.querySelector('.main__message');
  userNotExist.classList.add('hide');
}

