export const BASE_URL = "https://task-manager-buddy.onrender.com/api";

// Save token in localStorage
export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");

// Auth headers
const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper for protected API requests
export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // <--- send token
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Try to parse JSON
  const data = await response.json();
  return data;
};


// Signup
export const signupUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Login
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Get tasks
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: authHeaders(),
  });
  return res.json();
};

// Create task
export const createTask = async (task) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Update task
export const updateTask = async (id, task) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(task),
  });
  return res.json();
};

// Delete task
export const deleteTask = async (id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
};
export default BASE_URL;





