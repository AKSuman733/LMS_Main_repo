
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public/Auth
import Home from './pages/Home';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Student
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import CourseCatalog from './pages/Courses/CourseCatalog';
import CourseDetails from './pages/Courses/CourseDetails';
import CourseLearning from './pages/Courses/CourseLearning';
import EnrolledCourses from './pages/Dashboard/EnrolledCourses';
import Certificate from './pages/Dashboard/Certificate';
import Settings from './pages/Dashboard/Settings';

// Admin
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import AdminCourses from './pages/Admin/AdminCourses';
import AdminStudents from './pages/Admin/AdminStudents';
import AdminEnrollments from './pages/Admin/AdminEnrollments';
import AdminCompletedCourses from './pages/Admin/AdminCompletedCourses';
import AdminSettings from './pages/Admin/AdminSettings';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  const mode = import.meta.env.MODE;
  const redirectPath = mode === 'student' ? '/login/student' : 
                       mode === 'admin' ? '/login/admin' : 
                       '/roles';

  if (!user) return <Navigate to={redirectPath} />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to={redirectPath} />;
  
  return children;
};

function App() {
  const mode = import.meta.env.MODE;

  if (mode === 'student') {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route element={<AuthLayout />}>
            <Route path="/login/student" element={<Login forcedRole="student" />} />
            <Route path="/register/student" element={<Register forcedRole="student" />} />
            <Route path="/login/admin" element={<Navigate to="/" />} />
            <Route path="/register/admin" element={<Navigate to="/" />} />
          </Route>
          <Route path="/student" element={
            <ProtectedRoute requiredRole="student">
              <DashboardLayout role="student" />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<CourseCatalog />} />
            <Route path="course/:id" element={<CourseDetails />} />
            <Route path="learn/:enrollmentId" element={<CourseLearning />} />
            <Route path="enrolled" element={<EnrolledCourses />} />
            <Route path="certificate/:enrollmentId" element={<Certificate />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  if (mode === 'admin') {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route element={<AuthLayout />}>
            <Route path="/login/admin" element={<Login forcedRole="admin" />} />
            <Route path="/register/admin" element={<Register forcedRole="admin" />} />
            <Route path="/login/student" element={<Navigate to="/" />} />
            <Route path="/register/student" element={<Navigate to="/" />} />
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout role="admin" />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="enrollments" element={<AdminEnrollments />} />
            <Route path="completed" element={<AdminCompletedCourses />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  // Default Full Application for simple 'npm run dev'
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/roles" element={<MainLayout><RoleSelection /></MainLayout>} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute requiredRole="student">
            <DashboardLayout role="student" />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses" element={<CourseCatalog />} />
          <Route path="course/:id" element={<CourseDetails />} />
          <Route path="learn/:enrollmentId" element={<CourseLearning />} />
          <Route path="enrolled" element={<EnrolledCourses />} />
          <Route path="certificate/:enrollmentId" element={<Certificate />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <DashboardLayout role="admin" />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="completed" element={<AdminCompletedCourses />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
