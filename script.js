const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  applyTheme();
});

addBtn.addEventListener("click", addTask);
themeToggle.addEventListener("click", toggleTheme);
filterBtns.forEach(btn => btn.addEventListener("click", filterTasks));

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", e => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function filterTasks(e) {
  filterBtns.forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  const filter = e.target.dataset.filter;
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    switch (filter) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        task.style.display = task.classList.contains("completed") ? "flex" : "none";
        break;
      case "pending":
        task.style.display = task.classList.contains("completed") ? "none" : "flex";
        break;
    }
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

function applyTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }
}
