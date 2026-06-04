import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================= LAYOUTS ================= */

import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

/* ================= AUTH ================= */

import AdminLogin from "../pages/Auth/AdminLogin";

/* ================= PAGES ================= */

import HomePage from "../pages/Home/HomePage";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageCourses from "../pages/Admin/ManageCourses";
import ManageUsers from "../pages/Admin/ManageUsers";
import Analytics from "../pages/Admin/Analytics";

/* ===================================================== */
/* ================= ADMIN ROUTES ====================== */
/* ===================================================== */

function AppRoutes() {

  /* ===================================================== */
  /* AUTH CHECK */
  /* ===================================================== */

  const isLoggedIn =

    localStorage.getItem(
      "isLoggedIn"
    ) === "true";

  const role =

    localStorage.getItem(
      "role"
    );

  const isAdmin =

    isLoggedIn &&
    role === "admin";

  return (

    <Routes>

      {/* ===================================================== */}
      {/* ================= PUBLIC HOME ======================= */}
      {/* ===================================================== */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= LOGIN ============================= */}
      {/* ===================================================== */}

      <Route

        element={

          !isAdmin

            ? <AuthLayout />

            : (
              <Navigate
                to="/dashboard"
                replace
              />
            )
        }
      >

        <Route
          path="/login"
          element={<AdminLogin />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= PROTECTED ADMIN =================== */}
      {/* ===================================================== */}

      <Route

        element={

          isAdmin

            ? <AdminLayout />

            : (
              <Navigate
                to="/login"
                replace
              />
            )
        }
      >

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />

        {/* Analytics */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        {/* Users */}

        <Route
          path="/users"
          element={<ManageUsers />}
        />

        {/* Courses */}

        <Route
          path="/courses"
          element={<ManageCourses />}
        />

      </Route>

      {/* ===================================================== */}
      {/* ================= FALLBACK ========================== */}
      {/* ===================================================== */}

      <Route

        path="*"

        element={

          isAdmin

            ? (
              <Navigate
                to="/dashboard"
                replace
              />
            )

            : (
              <Navigate
                to="/"
                replace
              />
            )
        }
      />

    </Routes>
  );
}

export default AppRoutes;