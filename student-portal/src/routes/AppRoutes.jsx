import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { Clock } from "lucide-react";
import Home from "../pages/Home";
import Courses from "../pages/Courses/Courses";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Celebrities from "../pages/Celebrities";
import CourseDetails from "../pages/Courses/CourseDetails";
import CoursePlayer from "../pages/Courses/CoursePlayer";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resources from "../pages/Resources";
import PrivateRoute from "../components/PrivateRoute";
import Certificate from "../pages/Dashboard/Certificate";
import "../styles/MainLayout.css";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  if (user && !user.approved) {
    return (
      <div className="pending-approval-root">
        <div className="pending-approval-card">
          <Clock size={48} color="var(--color-warning)" className="pending-approval-icon" />
          <h2 className="pending-approval-title">Account Pending Approval</h2>
          <p className="pending-approval-text">
            Your account has been successfully created and is currently awaiting administrator approval. You will gain full access to the portal once your account is verified. This page will automatically refresh once approved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/celebrities" element={<Celebrities />} />
      <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/course/:id/player" element={<PrivateRoute><CoursePlayer /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/certificate/:enrollmentId" element={<PrivateRoute><Certificate /></PrivateRoute>} />
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
