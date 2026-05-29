import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const { user } = useContext(AuthContext);

  // Not logged in
  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Wrong role
  if (role && user.role !== role) {
     alert("Only Admins can access this page!")
     return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;