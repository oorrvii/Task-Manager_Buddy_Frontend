import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, setToken } from "../../api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData);

      if (data.token) {
        // Save token for auto-login
        setToken(data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}


        <button type="submit">Login</button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
  Don’t have an account?{" "}
  <span
    style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}
    onClick={() => navigate("/signup")}
  >
    Sign up
  </span>
</p>

      </form>
    </div>
  );
};

export default Login;




