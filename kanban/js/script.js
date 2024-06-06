document.addEventListener('DOMContentLoaded', () => {
    const newTaskButton = document.getElementById('newTaskButton');
    const taskModal = document.getElementById('taskModal');
    const closeModal = document.getElementById('closeModal');
    const taskForm = document.getElementById('taskForm');
    const saveTaskButton = document.getElementById('saveTaskButton');
    const deleteTaskButton = document.getElementById('deleteTaskButton');
    const langToggle = document.getElementById('langToggle');
    let editTask = null;

    const languages = {
        'pt': {
            'title': 'Kan-ban para Estudantes',
            'todo-title': 'A fazer',
            'doing-title': 'Em progresso',
            'done-title': 'Concluído',
            'new-task': 'Nova Tarefa'
        },
        'en': {
            'title': 'Kanban for Students',
            'todo-title': 'TO DO',
            'doing-title': 'DOING',
            'done-title': 'DONE',
            'new-task': 'New Task'
        }
    };

    let currentLang = 'pt';

    const toggleLanguage = () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        document.getElementById('title').textContent = languages[currentLang].title;
        document.querySelector('h2[data-lang="todo-title"]').textContent = languages[currentLang]['todo-title'];
        document.querySelector('h2[data-lang="doing-title"]').textContent = languages[currentLang]['doing-title'];
        document.querySelector('h2[data-lang="done-title"]').textContent = languages[currentLang]['done-title'];
        newTaskButton.textContent = languages[currentLang]['new-task'];
    };

    langToggle.addEventListener('click', toggleLanguage);

    newTaskButton.addEventListener('click', () => {
        taskModal.style.display = 'block';
        taskForm.reset();
        editTask = null;
    });

    closeModal.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskData = {
            title: taskForm.taskTitle.value,
            description: taskForm.taskDescription.value,
            priority: taskForm.taskPriority.value,
            dueDate: taskForm.taskDueDate.value,
            responsibles: taskForm.taskResponsibles.value,
            status: taskForm.taskStatus.value
        };

        if (editTask) {
            updateTask(editTask, taskData);
        } else {
            createTask(taskData);
        }

        taskModal.style.display = 'none';
    });

    deleteTaskButton.addEventListener('click', () => {
        if (editTask) {
            deleteTask(editTask);
            taskModal.style.display = 'none';
        }
    });

    const createTaskElement = (taskData) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        taskElement.draggable = true;
        taskElement.textContent = taskData.title;

        taskElement.addEventListener('dragstart', () => {
            taskElement.classList.add('dragging');
        });

        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
        });

        taskElement.addEventListener('click', () => {
            editTask = taskElement;
            taskModal.style.display = 'block';
            taskForm.taskTitle.value = taskData.title;
            taskForm.taskDescription.value = taskData.description;
            taskForm.taskPriority.value = taskData.priority;
            taskForm.taskDueDate.value = taskData.dueDate;
            taskForm.taskResponsibles.value = taskData.responsibles;
            taskForm.taskStatus.value = taskData.status;
        });

        return taskElement;
    };

    const createTask = (taskData) => {
        const taskElement = createTaskElement(taskData);
        document.getElementById('todo-list').appendChild(taskElement);
    };

    const updateTask = (taskElement, taskData) => {
        taskElement.textContent = taskData.title;
        taskElement.dataset.taskData = JSON.stringify(taskData);
    };

    const deleteTask = (taskElement) => {
        taskElement.remove();
    };

    const columns = document.querySelectorAll('.task-list');

    columns.forEach(column => {
        column.addEventListener('dragover', (event) => {
            event.preventDefault();
            const draggingTask = document.querySelector('.dragging');
            column.appendChild(draggingTask);
        });
    });
});
