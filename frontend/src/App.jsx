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
<<<<<<< HEAD
import ContactUs from './pages/ContactUs';
=======
<<<<<<< HEAD
import ContactUs from './pages/ContactUs';
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
import Dashboard from './pages/Dashboard/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminApproval from './pages/Admin/AdminApproval';
import AdminProfile from './pages/Admin/AdminProfile';
import UserManagement from './pages/Admin/UserManagement';
<<<<<<< HEAD

import ManageCelebrities from './pages/Admin/ManageCelebrities';
=======
import ManageInstructors from './pages/Admin/ManageInstructors';
import ManageCelebrities from './pages/Admin/ManageCelebrities';
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
import AdminSupportQueries from './pages/Admin/AdminSupportQueries';
import Reports from './pages/Admin/Reports';
import MyLearning from './pages/Dashboard/MyLearning';
import Certificates from './pages/Dashboard/Certificates';
import StudentQueries from './pages/Dashboard/StudentQueries';
import MyReceipts from './pages/Dashboard/MyReceipts';
<<<<<<< HEAD
import LoginSelection from './pages/Auth/LoginSelection';
import AdminLogin from './pages/Auth/AdminLogin';
import StudentLogin from './pages/Auth/StudentLogin';
import CourseManagement from './pages/Admin/CourseManagement';
=======
=======
import MyLearning from './pages/Dashboard/MyLearning';
import Certificates from './pages/Dashboard/Certificates';
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
import LoginSelection from './pages/Auth/LoginSelection';
import AdminLogin from './pages/Auth/AdminLogin';
import StudentLogin from './pages/Auth/StudentLogin';
import InstructorCourseManagement from './pages/Instructor/CourseManagement';
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
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
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'var(--surface-color)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'var(--success-color)',
                secondary: 'var(--surface-color)',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: 'var(--error-color)',
                secondary: 'var(--surface-color)',
              },
            },
            blank: {
              duration: 4000,
              iconTheme: {
                primary: 'var(--warning-color)',
                secondary: 'var(--surface-color)',
              },
            }
          }}
        />
        <Routes>
          {/* Admin Routes - Using AdminLayout (Sidebar) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="approvals" element={<AdminApproval />} />
<<<<<<< HEAD
            <Route path="courses" element={<CourseManagement />} />
=======
            <Route path="instructors" element={<ManageInstructors />} />
            <Route path="courses" element={<InstructorCourseManagement />} />
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            <Route path="explore" element={<CourseList />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="celebrities" element={<ManageCelebrities />} />
<<<<<<< HEAD
            <Route path="queries" element={<AdminSupportQueries />} />
            <Route path="reports" element={<Reports />} />
=======
<<<<<<< HEAD
            <Route path="queries" element={<AdminSupportQueries />} />
            <Route path="reports" element={<Reports />} />
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
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
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'var(--surface-color)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'var(--success-color)',
              secondary: 'var(--surface-color)',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: 'var(--error-color)',
              secondary: 'var(--surface-color)',
            },
          },
          blank: {
            duration: 4000,
            iconTheme: {
              primary: 'var(--warning-color)',
              secondary: 'var(--surface-color)',
            },
          }
        }}
      />
      <Routes>
        {/* Public Routes - Using MainLayout (Navbar) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="course/:id" element={<CourseDetail />} />
          <Route path="celebrities" element={<Celebrities />} />
          <Route path="about" element={<AboutUs />} />
<<<<<<< HEAD
          <Route path="contact" element={<ContactUs />} />
=======
<<<<<<< HEAD
          <Route path="contact" element={<ContactUs />} />
=======
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        </Route>

        {/* Student Routes - Using StudentLayout (Sidebar) */}
        <Route path="/" element={<StudentLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student/explore" element={<CourseList />} />
          <Route path="student/course/:id" element={<CourseDetail />} />
          <Route path="student/profile" element={<AdminProfile />} />
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
          <Route path="student/receipts" element={<MyReceipts />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="my-queries" element={<StudentQueries />} />
<<<<<<< HEAD
=======
=======
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="certificates" element={<Certificates />} />
>>>>>>> ea7d4c330ef821eaa42c835b4f6fb8675e70f7fe
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
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
