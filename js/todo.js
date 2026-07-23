let TodoForm = document.getElementById('todo-form');
let TodoList = document.getElementById('todo-list');
let todos = [];
let TodoFollow = document.querySelectorAll('todo-follow');
let activeTaskText = document.getElementById('timer-active-task-title');
let activeTaskContainer = document.getElementById('timer-active-task');
let activeTask = localStorage.getItem('active-task');
let clearActiveTaskBtn = document.getElementById('clear-active-task-btn');
let MainTimerBtn = document.querySelector('.maintimer');

if (activeTask) {
    activeTaskText.textContent = activeTask;
    activeTaskContainer.classList.remove('hidden');
} else {
    activeTaskContainer.classList.add('hidden');
}

clearActiveTaskBtn.addEventListener('click', () => {
    activeTaskText.textContent = '';
    activeTaskContainer.classList.add('hidden');
    localStorage.setItem('active-task', '')
})





TodoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const TodoInput = document.getElementById('todo-input').value;
    const LiStorage = {
        id: Date.now(),
        text: TodoInput,
        completed: false
    }
    const isNotUnique = todos.some(t => t.text === LiStorage.text);
    if (!isNotUnique) {
        todos.push(LiStorage);
        saveToLocalStorage();
        renderTodos();
        TodoForm.reset();
        updateTaskStats();
    } else {
        alert('Such an object is already exists');
    }
})

TodoList.addEventListener('click', function (event) {
    const Li = event.target.closest('li');
    const todoText = Li.querySelector('.todo-text').textContent;
    const todoId = parseInt(Li.dataset.id);
    if (event.target.classList.contains('todo-delete-btn')) {
        todos = todos.filter(todo => todo.id !== todoId);
        Li.remove();
        saveToLocalStorage();
        if (todoText === localStorage.getItem('active-task')) {
            activeTaskText.textContent = '';
            activeTaskContainer.classList.add('hidden');
        }
    };
    if (event.target.classList.contains('todo-checkbox')) {
        const todo = todos.find(todo => todo.id === todoId);
        todo.completed = !todo.completed;
        Li.classList.toggle('todo-completed');
        saveToLocalStorage();
        updateTaskStats();
        renderTodos();
    };
    if (event.target.classList.contains('todo-follow')) {
        localStorage.setItem('active-task', todoText);
        activeTaskText.textContent = todoText;
        activeTaskContainer.classList.remove('hidden');
        MainTimerBtn.click();
    }
})



function saveToLocalStorage() {
    localStorage.setItem('study-todos', JSON.stringify(todos));
}

function renderTodos() {
    TodoList.innerHTML = '';
    todos.forEach(function (todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.id = todo.id;
        li.innerHTML = `
            <input type='checkbox' class='todo-checkbox' ${todo.completed ? 'checked' : ''}>
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button class='todo-delete-btn'>Delete</button>
            <button id='todo-follow' class='todo-follow'>Follow</button>
        `;
        TodoList.append(li);

    })
}

const savedTodos = localStorage.getItem('study-todos');
if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
}

let ProgressBar = document.getElementById('progress-bar-fill');
let ProgressText = document.getElementById('progress-text');
function updateTaskStats() {
    const TodoLength = todos.length;
    const TodoCompleted = todos.filter(t => t.completed).length;
    const TodoPercent = Math.ceil((TodoCompleted / TodoLength) * 100)||0;
    ProgressBar.style.width = `${TodoPercent / 5}rem`;
    ProgressText.textContent = `${TodoPercent}% tasks were completed`;
}








updateTaskStats()