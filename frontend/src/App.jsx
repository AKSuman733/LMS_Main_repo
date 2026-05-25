import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import CourseList from './pages/Courses/CourseList';
import CourseDetail from './pages/Courses/CourseDetail';
import Celebrities from './pages/Celebrities';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminApproval from './pages/Admin/AdminApproval';
import AdminProfile from './pages/Admin/AdminProfile';
import UserManagement from './pages/Admin/UserManagement';
import ManageInstructors from './pages/Admin/ManageInstructors';
import MyLearning from './pages/Dashboard/MyLearning';
import Certificates from './pages/Dashboard/Certificates';
import LoginSelection from './pages/Auth/LoginSelection';
import AdminLogin from './pages/Auth/AdminLogin';
import StudentLogin from './pages/Auth/StudentLogin';
import InstructorCourseManagement from './pages/Instructor/CourseManagement';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

// Axios Interceptor for Auth
// Auth endpoints that handle their own errors - do NOT redirect from these
const AUTH_ENDPOINTS = ['/api/auth/login', '/api/auth/send-otp', '/api/auth/verify-otp', '/api/auth/register', '/api/auth/forgot-password', '/api/auth/reset-password'];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';
    const isAuthEndpoint = AUTH_ENDPOINTS.some(ep => requestUrl.includes(ep));

    // Only auto-redirect on 401/403 for protected (non-auth) endpoints
    if (!isAuthEndpoint && error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login?error=Session expired. Please login again.';
    }
    return Promise.reject(error);
  }
);

import StudentLayout from './layouts/StudentLayout';

function App() {
  const appType = import.meta.env.VITE_APP_TYPE || 'user';

  if (appType === 'admin') {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Admin Routes - Using AdminLayout (Sidebar) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="approvals" element={<AdminApproval />} />
            <Route path="instructors" element={<ManageInstructors />} />
            <Route path="courses" element={<InstructorCourseManagement />} />
            <Route path="explore" element={<CourseList />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          <Route path="/login" element={<AdminLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public Routes - Using MainLayout (Navbar) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="course/:id" element={<CourseDetail />} />
          <Route path="celebrities" element={<Celebrities />} />
          <Route path="about" element={<AboutUs />} />
        </Route>

        {/* Student Routes - Using StudentLayout (Sidebar) */}
        <Route path="/" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student/explore" element={<CourseList />} />
          <Route path="student/course/:id" element={<CourseDetail />} />
          <Route path="student/profile" element={<AdminProfile />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="certificates" element={<Certificates />} />
        </Route>

        <Route path="/login" element={<StudentLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
