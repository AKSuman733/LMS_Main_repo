import { Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import CoursesPage from "../pages/CoursesPage";
import ContactPage from "../pages/ContactPage";

import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import StudentCourses from "../pages/Dashboard/StudentCourses";
import StudentEnrolledCourses from "../pages/Dashboard/StudentEnrolledCourses";
import ProfilePage from "../pages/Dashboard/ProfilePage";

import PaymentPage from "../pages/PaymentPage";

function ProtectedRoute({ children }) {
  const isStudentLoggedIn = localStorage.getItem("studentToken");

  if (!isStudentLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/courses" element={<CoursesPage />} />

      <Route path="/contact" element={<ContactPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-courses"
        element={
          <ProtectedRoute>
            <StudentCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student-enrolled-courses"
        element={
          <ProtectedRoute>
            <StudentEnrolledCourses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/:courseId"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}