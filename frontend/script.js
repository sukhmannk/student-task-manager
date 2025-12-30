const API_URL = "http://localhost:3000/tasks";

// Fetch and display tasks
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task.title}
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
async function addTask() {
  const input = document.getElementById("taskTitle");
  const title = input.value.trim();

  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  fetchTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchTasks();
}

// Load tasks on page load
fetchTasks();
