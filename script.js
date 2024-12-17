function saveTasks () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaksButton.addEventListener('click', addTask);
    renderTask();
}

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Функція для відображення задач
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);

            const span = document.createElement("span");
            span.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Видалити';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(index));

            li.appendChild(span);
            li.appendChild(deleteBtn);
            li.addEventListener('click', () => toggleTask(index));

            taskList.appendChild(li);
        });
    }

    // Функція для додавання задачі
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    // Функція для видалення задачі
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Функція для позначення виконаної задачі
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Функція для збереження задач у LocalStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Обробник для кнопки додавання задачі
    addTaskButton.addEventListener('click', addTask);

    // Початкове відображення задач
    renderTasks();
});
