import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CoursesPage from './pages/CoursesPage';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageStudents from "./pages/Admin/ManageStudents";
import ManageCourses from "./pages/Admin/ManageCourses";
import ManageAITutors from "./pages/Admin/ManageAITutors";
import Performance from "./pages/Admin/Performance";
import Certificates from "./pages/Admin/Certificates";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/courses" element={<ManageCourses />} />
        <Route path="/admin/ai-teachers" element={<ManageAITutors />} />
        <Route path="/admin/performance" element={<Performance />} />
        <Route path="/admin/certificates" element={<Certificates />} />
        <Route
          path="/courses"
          element={<CoursesPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}