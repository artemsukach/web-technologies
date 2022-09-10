import {
  TOP_MENU as menu,
} from './config.js';

const menuWrapper = document.querySelector('.header__list');
const subKeys = []

function createMenuItem() {
  for (let key in menu) {
    const li = document.createElement('li');
    li.classList.add('header__list-item');
    if (menu[key].hasOwnProperty('submenu')) {
      subKeys.push(key);
      let links = ``;
      for(let i of menu[key]['submenu']){
        links += `<a href="${i.url}">${i.title}</a>`;
      }
      li.innerHTML = `
      <button class="dropbtn" >${menu[key].title}
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content" id="${key}">
      ${links}
      </div>`;
      menuWrapper.append(li);
    } else{
      li.innerHTML=`<a href="${menu[key].url}" class="header__link">${menu[key].title}</a>`
      menuWrapper.append(li);
    }
  }
}

createMenuItem();


window.onclick = function(e) {
if (!e.target.matches('.dropbtn')) {
  var myDropdown = document.querySelectorAll('.dropdown-content');
  for(let el of myDropdown){
    if (el.classList.contains('show')) {
      el.classList.remove('show');
    }
  }
}
}

const dropBtn = document.querySelectorAll('.dropbtn');
for(let i =0; i<dropBtn.length;i++){
  dropBtn[i].addEventListener('click', () => myFunction(subKeys[i]));
}
function myFunction(el) {

  document.getElementById(el).classList.toggle("show");
}