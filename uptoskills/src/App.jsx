/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './AuthContext';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import CoursesPage from './pages/CoursesPage';

import AITutorPage from './pages/AITutorPage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import ManageCourses from './pages/Admin/ManageCourses';
import ManageStudents from './pages/Admin/ManageStudents';
import ProfilePage from './pages/ProfilePage';
import NewDashboard from './pages/NewDashboard';
import MyCourses from './pages/MyCourses';
import NewAiTutor from './pages/NewAiTutor';
import StreakPage from "./pages/StreakPage";
import ManageAITutors from "./pages/admin/ManageAITutors";
import FullStack from "./pages/FullStack";
import FullStackLesson from "./pages/FullStackLesson";
// MACHINE LEARNING
import MachineLearning from "./pages/MachineLearning";
import MachineLearningLesson from "./pages/MachineLearningLesson";
import UIUX from "./pages/UIUX";
import UIUXLesson from "./pages/UIUXLesson";
import DataStructures from "./pages/DataStructures";
import ArtificialIntelligence from "./pages/ArtificialIntelligence";
import CPPProgramming from "./pages/CPPProgramming";
import DataStructuresLesson from "./pages/DataStructuresLesson";
import ArtificialIntelligenceLesson from "./pages/ArtificialIntelligenceLesson";
import CPPProgrammingLesson from "./pages/CPPProgrammingLesson";
import Python from "./pages/Python";
import PythonLesson from "./pages/PythonLesson";
import Java from "./pages/Java";
import JavaLesson from "./pages/JavaLesson";
import CProgramming from "./pages/CProgramming";
import CProgrammingLesson from "./pages/CProgrammingLesson";
import Performance from './pages/admin/Performance';
import Certificates from './pages/admin/Certificates';
// Protected Route
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === 'admin' ? '/admin' : '/dashboard'}
        replace
      />
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/admin/certificates"
            element={<Certificates />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="/courses"
            element={<CoursesPage />}
          />

          {/* ========================= */}
          {/* STUDENT ROUTES */}
          {/* ========================= */}

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          {/* AI Tutor */}
          <Route
            path="/dashboard/ai-tutor"
            element={
              <ProtectedRoute role="student">
                <AITutorPage />
              </ProtectedRoute>
            }
          />

          {/* Course Detail */}
          

          

          {/* ========================= */}
          {/* ADMIN ROUTES */}
          {/* ========================= */}

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Manage Courses */}
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute role="admin">
                <ManageCourses />
              </ProtectedRoute>
            }
          />

          {/* Manage Students */}
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute role="admin">
                <ManageStudents />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

          <Route
           path="/dashboard/profile"
           element={
           <ProtectedRoute role="student">
          <ProfilePage />
          </ProtectedRoute> }
          />
          <Route path="/new-dashboard" element={<ProtectedRoute role="student"><NewDashboard /></ProtectedRoute>} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/new-ai-tutor" element={<NewAiTutor />} />
          <Route path="/dashboard/streaks" element={<StreakPage />} />
          <Route path="/admin/ai-teachers" element={<ManageAITutors />} />
          <Route path="/course/fullstack" element={<FullStack />} />
          <Route path="/lesson/fullstack/:id" element={<FullStackLesson />} />
          <Route path="/machinelearning" element={<MachineLearning />} />

          <Route path="/machinelearning/lesson" element={<MachineLearningLesson />} />   
          <Route path="/uiux" element={<UIUX />} />
          <Route path="/uiux/lesson" element={<UIUXLesson />} />
          <Route path="/dsa" element={<DataStructures />} />
          <Route path="/ai" element={<ArtificialIntelligence />} />
          <Route path="/cpp-programming" element={<CPPProgramming />} />
          <Route path="/dsa/lesson" element={<DataStructuresLesson />} />
          <Route path="/ai/lesson" element={<ArtificialIntelligenceLesson />} />
          <Route path="/cpp-programming/lesson" element={<CPPProgrammingLesson />} />
          <Route path="/python" element={<Python />} />
          <Route path="/python/lesson" element={<PythonLesson />} />
          <Route path="/java" element={<Java />} />
          <Route path="/java/lesson" element={<JavaLesson />} />
          <Route path="/c-programming" element={<CProgramming />} />
          <Route path="/c-programming/lesson" element={<CProgrammingLesson />} />
          <Route path="/admin/performance" element={<Performance />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}