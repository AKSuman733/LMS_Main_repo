import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================= LAYOUTS ================= */

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";

/* ================= HOME ================= */

import HomePage from "../pages/Home/HomePage";

/* ================= AUTH PAGES ================= */

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import RegisterRole from "../pages/Auth/RegisterMethod";
import RegisterMethod from "../pages/Auth/RegisterMethod";

/* ================= COURSE PAGES ================= */

import Courses from "../pages/Courses/Courses";
import CourseDetails from "../pages/Courses/CourseDetails";
import WatchCourse from "../pages/Courses/WatchCourse";

/* ================= STUDENT DASHBOARD ================= */

import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import MyCourses from "../pages/Dashboard/MyCourses";
import Profile from "../pages/Dashboard/Profile";

/* ===================================================== */
/* ================= STUDENT ROUTES ===================== */
/* ===================================================== */

function AppRoutes() {

  /* ===================================================== */
  /* AUTH CHECK */
  /* ===================================================== */

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const role =
    localStorage.getItem(
      "role"
    );

  return (

    <Routes>

      {/* ===================================================== */}
      {/* ================= PUBLIC WEBSITE ==================== */}
      {/* ===================================================== */}

      <Route element={<MainLayout />}>

        {/* HOME */}

        <Route
          path="/"
          element={<HomePage />}
        />

        {/* COURSES */}

        <Route
          path="/courses"
          element={<Courses />}
        />

        {/* COURSE DETAILS */}

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        {/* ===================================================== */}
        {/* ================= PROTECTED WATCH COURSE ============ */}
        {/* ===================================================== */}

        <Route

          path="/watch-course/:id"

          element={

            isLoggedIn &&
            role === "student"

              ? <WatchCourse />

              : (
                <Navigate
                  to="/login"
                  replace
                />
              )
          }
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= AUTH ROUTES ======================= */}
      {/* ===================================================== */}

      <Route element={<AuthLayout />}>

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ===================================================== */}
        {/* ================= REGISTER FLOW ==================== */}
        {/* ===================================================== */}

        {/* STEP 1: CHOOSE ROLE */}

        <Route
          path="/register"
          element={<RegisterRole />}
        />

        {/* STEP 2: CHOOSE METHOD */}

        <Route
          path="/register-method/:role"
          element={<RegisterMethod />}
        />

        {/* STEP 3: REGISTER FORM */}

        <Route
          path="/register/:role"
          element={<Register />}
        />

        {/* FORGOT PASSWORD */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= PROTECTED DASHBOARD =============== */}
      {/* ===================================================== */}

      <Route

        element={

          isLoggedIn &&
          role === "student"

            ? <StudentDashboardLayout />

            : (
              <Navigate
                to="/login"
                replace
              />
            )
        }
      >

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<StudentDashboard />}
        />

        {/* MY COURSES */}

        <Route
          path="/dashboard/my-courses"
          element={<MyCourses />}
        />

        {/* PROFILE */}

        <Route
          path="/dashboard/profile"
          element={<Profile />}
        />

        {/* WATCH COURSE */}

        <Route
          path="/dashboard/watch-course/:id"
          element={<WatchCourse />}
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