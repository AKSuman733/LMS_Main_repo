import { Routes, Route, Navigate } from "react-router-dom";

import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import AdminDashboardPage from "../pages/Admin/AdminDashboardPage";
import AdminCoursesPage from "../pages/Admin/AdminCoursesPage";
import AdminStudentsPage from "../pages/Admin/AdminStudentsPage";
import AdminMentorsPage from "../pages/Admin/AdminMentorsPage";
import AdminEventsPage from "../pages/Admin/AdminEventsPage";
import AdminEventRegistrationsPage from "../pages/Admin/AdminEventRegistrationsPage";
import AdminCertificatesPage from "../pages/Admin/AdminCertificatesPage";
import AdminMessagesPage from "../pages/Admin/AdminMessagesPage";

import AdminLayout from "../components/layout/AdminLayout";

function ProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("uptoskills_admin_token");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-login" replace />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="students" element={<AdminStudentsPage />} />
        <Route path="mentors" element={<AdminMentorsPage />} />
        <Route path="events" element={<AdminEventsPage />} />
        <Route
          path="event-registrations"
          element={<AdminEventRegistrationsPage />}
        />
        <Route path="certificates" element={<AdminCertificatesPage />} />
        <Route path="messages" element={<AdminMessagesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}