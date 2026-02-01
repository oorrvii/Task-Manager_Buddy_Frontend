import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If user has token, redirect to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  return children;
};

export default RedirectIfLoggedIn;
