const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS FIX — allow Live Server explicitly
app.use(cors({
  origin: "http://127.0.0.1:5501"
}));

app.use(express.json());

// Temporary in-memory task list
let tasks = [];


// Test route
app.get("/", (req, res) => {
  res.send("Student Task Manager API is running");
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  const newTask = {
    id: Date.now(),
    title: title,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: "Task deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
