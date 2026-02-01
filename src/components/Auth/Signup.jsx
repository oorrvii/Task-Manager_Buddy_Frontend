import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, setToken } from "../../api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const data = await signupUser(formData);

      if (data.token) {
        // Save token for auto-login
        setToken(data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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


        <button type="submit">Signup</button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
  Already have an account?{" "}
  <span
    style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}
    onClick={() => navigate("/login")}
  >
    Login
  </span>
</p>

      </form>
    </div>
  );
};

export default Signup;



