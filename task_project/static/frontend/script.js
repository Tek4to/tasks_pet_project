document.getElementById('loginForm').onsubmit = async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.access) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        alert('Login successful');
        document.getElementById('login').style.display = 'none';
        document.getElementById('create-task').style.display = 'block';
        document.getElementById('task-list').style.display = 'block';
        loadTasks();
    } else {
        alert('Login failed');
    }
};

document.getElementById('taskForm').onsubmit = async function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch('/api/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        alert('Task created successfully');
        loadTasks();
    } else {
        alert('Failed to create task');
    }
};

async function loadTasks() {
    const response = await fetch('/api/tasks/', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    });

    const tasks = await response.json();
    const tasksList = document.getElementById('tasks');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.title}: ${task.description}`;
        tasksList.appendChild(listItem);
    });
}
