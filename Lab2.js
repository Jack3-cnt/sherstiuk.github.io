// Зберігаємо список справ у масиві
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Отримуємо елементи DOM
const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

// Функція для рендерингу однієї справи
function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.completed ? 'checked' : ''} onclick="checkTodo(${todo.id})" />
      <label for="${todo.id}">
        <span class="${todo.completed ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

// Функція для рендерингу всього списку
function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
  updateCounter();
}

// Функція для оновлення лічильників
function updateCounter() {
  const totalCount = todos.length;
  const uncheckedCount = todos.filter(todo => !todo.completed).length;

  itemCountSpan.textContent = totalCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}

// Функція для додавання нової справи
function newTodo() {
  const todoText = prompt('Введіть нову справу:');
  if (todoText && todoText.trim() !== '') {
    const newTodo = {
      id: Date.now(), // Унікальний ID на основі часу
      text: todoText,
      completed: false
    };

    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos)); // Зберігаємо в localStorage
    render();
  }
}

// Функція для видалення справи
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos)); // Оновлюємо localStorage
  render();
}

// Функція для відмітки справи як виконано
function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  todo.completed = !todo.completed;
  localStorage.setItem('todos', JSON.stringify(todos)); // Оновлюємо localStorage
  render();
}

// Завантажуємо початкові дані та рендеримо список при завантаженні сторінки
render();