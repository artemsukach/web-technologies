/**
 * @author Artem Sukach <artemsukach.official@gmail.com>
 */

const addTaskBtn = document.querySelector('.add-form-button');
const deskTaskInput = document.querySelector('.add-form-input');
const list = document.querySelector('.todo-list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItemElems = [];

/**
 * Create task element.
 * 
 * @constructor
 * @this {tasks}
 * @param {string} description - User task.
 */

function Task(description){
    /** @private */
    this.description = description;
    /** @private */
    this.completed = false;
}

/**
 * Create template for HTML.
 * 
 * @param {object} task user task.
 * @param {number} index index of user task.
 * @return {string} task template.
 */

const createTemplate = (task, index) => {
    return `
        <li class="todo-list-item ${task.completed ? 'checked' : ''}">
            <label>
            <input onclick="completeTask(${index})" type="checkbox" class="todo-list-input" ${task.completed ? 'checked' : ''}>
            <span class="text-item">${task.description}</span>
            </label>
        </li>
    `
};

/**
 * Filtering tasks (completed tasks at the top).
 */


const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == true);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == false);
    tasks = [...activeTasks, ...completedTasks];
};

/**
 * Filling with tasks.
 */

const fillToDoList = () => {
    list.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            list.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-list-item');
    }
};

fillToDoList();

/**
 * Update Local storage.
 */

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

/**
 * Adding or remove class "checked" if user ckick on checkbox.
 * 
 * @param {number} index index of user task.
 */

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else{
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillToDoList();
};

/**
 * Listen to click event.
 * 
 * @type {HTMLElement}
 * @listens document#click
 */

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillToDoList();
    deskTaskInput.value = '';
  });

/**
 * Listen to keydown event.
 * 
 * @type {HTMLElement}
 * @listens document#keydown
 */

deskTaskInput.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillToDoList();
    deskTaskInput.value = '';
    }
  });