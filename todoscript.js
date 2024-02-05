document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a valid task.");
        return;
    }

    const tasks = getTasks();
    tasks.push({ text: taskText, completed: false });
    saveTasks(tasks);
    loadTasks();

    taskInput.value = "";
}

function editTask(index) {
    const tasks = getTasks();
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        loadTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
}

function toggleTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    loadTasks();
}

function clearTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        localStorage.removeItem("tasks");
        loadTasks();
    }
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}