import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import BASE_URL from "../api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchTasks();
  }, []);

 const fetchTasks = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Fetch tasks failed:", data);
      return;
    }

    const enhanced = Array.isArray(data)
      ? data.map((t) => ({ ...t, completed: false }))
      : [];

    setTasks(enhanced);
  } catch (err) {
    console.error("Fetch tasks error:", err);
  }
};

const addTask = async () => {
  if (!title.trim()) return;

  try {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Add task failed:", data);
      return;
    }

    setTasks([...tasks, { ...data, completed: false }]);
    setTitle("");
    setDescription("");
  } catch (err) {
    console.error("Add task error:", err);
  }
};


  const deleteTask = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    // update UI ONLY if backend succeeded
    setTasks((prev) => prev.filter((task) => task._id !== id));
  } catch (err) {
    console.error("Delete task error:", err);
    alert("Failed to delete task");
  }
};


  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={`dashboard ${darkMode ? "dark" : ""}`}>
      {/* Header */}
      <div className="header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button
            className="btn btn-ghost"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Add Task */}
      <div className="card">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Tasks */}
      <div className="tasks-title">Your Tasks</div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Start by adding your first task above.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            className={`task-card ${
              task.completed ? "completed" : ""
            }`}
            key={task._id}
          >
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id)}
              />

              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
            </div>

            <button
              className="btn btn-danger"
              onClick={() => deleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;










