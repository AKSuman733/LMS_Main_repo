import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Courses from "./pages/admin/Courses";
import Users from "./pages/admin/Users";
import Enrollments from "./pages/admin/Enrollments";
import AddCourse from "./pages/admin/AddCourse";
import AddIntern from "./pages/admin/AddIntern";
import Approvals from "./pages/admin/Approvals";
import Reports from "./pages/admin/Reports";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

  <Route path="/signup" element={<Signup />} />

      <Route
        path="/admin"
        element={
    <ProtectedRoute role="admin">
      <Dashboard />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/courses"
        element={
    <ProtectedRoute role="admin">
      <Courses />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/add-course"
        element={
    <ProtectedRoute role="admin">
      <AddCourse />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/users"
        element={
    <ProtectedRoute role="admin">
      <Users />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/enrollments"
        element={
    <ProtectedRoute role="admin">
      <Enrollments />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/new-intern"
        element={
    <ProtectedRoute role="admin">
      <AddIntern />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/approvals"
        element={
    <ProtectedRoute role="admin">
      <Approvals />
    </ProtectedRoute>
  }
      />

      <Route
        path="/admin/reports"
        element={
    <ProtectedRoute role="admin">
      <Reports />
    </ProtectedRoute>
  }
      />

    </Routes>
  );
}

export default App;