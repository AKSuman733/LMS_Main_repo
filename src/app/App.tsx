import { BrowserRouter, Routes, Route } from 'react-router';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { CourseListing } from './pages/CourseListing';
import { CourseDetail } from './pages/CourseDetail';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { MyCourses } from './pages/MyCourses';
import { Certificates } from './pages/Certificates';
import { Badges } from './pages/Badges';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsers } from './pages/AdminUsers';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminCourses } from './pages/AdminCourses';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSettings } from './pages/AdminSettings';
import { AdminEnrollments } from './pages/AdminEnrollments';
import { AdminReports } from './pages/AdminReports';
import { AdminRoles } from './pages/AdminRoles';
import { Unauthorized } from './pages/Unauthorized';
import { NotFound } from './pages/NotFound';
import { StyleGuide } from './pages/StyleGuide';
import { ScrollToTop } from './components/ScrollToTop';
import { StudentRoute, AdminRoute, GuestRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';
import { PathsPage } from './pages/PathsPage';
import { CommunityPage } from './pages/CommunityPage';
import { TeamsPage } from './pages/TeamsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Layout Pages (Shared Header and Footer) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CourseListing />} />
          <Route path="paths" element={<PathsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="style-guide" element={<StyleGuide />} />
        </Route>

        {/* Auth Routes (No regular Navbar/Footer) - Protected with GuestRoute */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Course Details (Outside layout for custom video sidebar/controls) */}
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* Student Dashboard - Protected with StudentRoute */}
        <Route path="/dashboard" element={
          <StudentRoute>
            <DashboardLayout />
          </StudentRoute>
        }>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="badges" element={<Badges />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          {/* Paths can also map to PathsPage inside dashboard */}
          <Route path="paths" element={<PathsPage />} />
        </Route>

        {/* Admin Routes - Protected with AdminRoute */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
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