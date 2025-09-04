const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('todo');

    const taskSpan = document.createElement('span');
    taskSpan.className = 'task';
    taskSpan.textContent = task.text;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.textContent = 'Delete';

    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);
    taskList.appendChild(taskDiv);

    // Edit Task
    editBtn.addEventListener('click', () => {
      if (editBtn.textContent === 'Edit') {
        taskSpan.contentEditable = 'true';
        taskSpan.focus();
        editBtn.textContent = 'Save';
      } else {
        taskSpan.contentEditable = 'false';
        const updatedText = taskSpan.textContent.trim();
        if (updatedText === '') {
          alert('Task cannot be empty.');
          taskSpan.textContent = task.text;
        } else {
          task.text = updatedText;
          saveTasks();
        }
        editBtn.textContent = 'Edit';
      }
    });

    // Delete Task
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t !== task);
      saveTasks();
      renderTasks();
    });
  });
}

addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (!taskText) {
    alert('Please enter a task.');
    return;
  }
  tasks.push({ text: taskText });
  saveTasks();
  renderTasks();
  input.value = '';
});

// Initial render
renderTasks();
