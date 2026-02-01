import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // User not logged in → redirect to login
    return <Navigate to="/login" />;
  }

  return children; // User logged in → show page
};

export default PrivateRoute;
