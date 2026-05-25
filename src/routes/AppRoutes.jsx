import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================= LAYOUTS ================= */

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/* ================= HOME ================= */

import HomePage from "../pages/Home/HomePage";

/* ================= AUTH PAGES ================= */

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import AdminLogin from "../pages/Auth/AdminLogin";
import InstructorLogin from "../pages/Auth/InstructorLogin";

/* ================= COURSE PAGES ================= */

import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/Courses/CourseDetails";
import WatchCourse from "../pages/Courses/WatchCourse";

/* ================= STUDENT DASHBOARD ================= */

import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import MyCourses from "../pages/Dashboard/MyCourses";
import Profile from "../pages/Dashboard/Profile";

/* ================= ADMIN ================= */

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageCourses from "../pages/Admin/ManageCourses";
import ManageUsers from "../pages/Admin/ManageUsers";
import Analytics from "../pages/Admin/Analytics";

/* ===================================================== */
/* ================= APP ROUTES ========================= */
/* ===================================================== */

function AppRoutes() {
  return (
    <Routes>

      {/* ===================================================== */}
      {/* ================= PUBLIC WEBSITE ==================== */}
      {/* ===================================================== */}

      <Route element={<MainLayout />}>

        {/* Home */}

        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Courses */}

        <Route
          path="/courses"
          element={<Courses />}
        />

        {/* Course Details */}

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        {/* ===================================================== */}
        {/* =========== AI GENERATED LESSON ROUTE =============== */}
        {/* ===================================================== */}

        <Route
          path="/watch-course/:id"
          element={<WatchCourse />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= AUTH ROUTES ======================= */}
      {/* ===================================================== */}

      <Route element={<AuthLayout />}>

        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Forgot Password */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Admin Login */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* Instructor Login */}

        <Route
          path="/instructor-login"
          element={<InstructorLogin />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= STUDENT DASHBOARD ================= */}
      {/* ===================================================== */}

      <Route element={<DashboardLayout />}>

        {/* Dashboard Home */}

        <Route
          path="/dashboard"
          element={<StudentDashboard />}
        />

        {/* My Courses */}

        <Route
          path="/dashboard/my-courses"
          element={<MyCourses />}
        />

        {/* Profile */}

        <Route
          path="/dashboard/profile"
          element={<Profile />}
        />

        {/* ===================================================== */}
        {/* =============== WATCH COURSE ======================== */}
        {/* ===================================================== */}

        <Route
          path="/dashboard/watch-course/:id"
          element={<WatchCourse />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= ADMIN ROUTES ====================== */}
      {/* ===================================================== */}

      <Route element={<DashboardLayout />}>

        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        {/* Manage Courses */}

        <Route
          path="/admin/courses"
          element={<ManageCourses />}
        />

        {/* Manage Users */}

        <Route
          path="/admin/users"
          element={<ManageUsers />}
        />

        {/* Analytics */}

        <Route
          path="/admin/analytics"
          element={<Analytics />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= FALLBACK ROUTE ==================== */}
      {/* ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;