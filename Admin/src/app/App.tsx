import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminCourses } from './pages/AdminCourses';
import { AdminPaths } from './pages/AdminPaths';
import { AdminCertificates } from './pages/AdminCertificates';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSettings } from './pages/AdminSettings';
import { AdminEnrollments } from './pages/AdminEnrollments';
import { AdminReports } from './pages/AdminReports';
import { AdminRoles } from './pages/AdminRoles';
import { Unauthorized } from './pages/Unauthorized';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminRoute, GuestRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Redirect Root to Admin Panel */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Auth Routes */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />

        {/* Admin Routes - Protected with AdminRoute */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="paths" element={<AdminPaths />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="roles" element={<AdminRoles />} />
        </Route>

        {/* Unauthorized & 404 */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}