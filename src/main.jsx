import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";




import { lazy, Suspense } from "react";


import "react-toastify/dist/ReactToastify.css";
// import "./styles/design-tokens.css";
import "./styles/tokens.css";
import "./styles/interactions.css";
import "./styles/animations.css";
// import "./styles/global.css";

/* PAGES */
import User from "./pages/auth/User.jsx";
import Admin from "./pages/auth/Admin.jsx";
import Createaccount from "./pages/auth/Createaccount.jsx";

import Course from "./pages/courses/Course.jsx";
import Coursedetails from "./pages/courses/Coursedetails.jsx";
// import Analytics from "./pages/courses/Analytics.jsx";
import Challenges from "./pages/courses/Challenges.jsx";
import UserProfile from "./pages/courses/UserProfile.jsx";

import Udashboard from "./pages/Dashboard/Udashboard.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";

import Adashboard from "./pages/Dashboard/Adashboard.jsx";
import Stud from "./pages/Dashboard/Stud.jsx";
import Acourse from "./pages/courses/Acourse.jsx";
import Mentors from "./pages/courses/Mentors.jsx";
import Mycourses from "./pages/courses/Mycourses.jsx";
// import Mycertificates from "./pages/courses/Mycertificates.jsx";
import Addstudent from "./pages/courses/Addstudent.jsx";
import ManageChallenges from "./pages/courses/ManageChallenges.jsx";
import Reviews from "./pages/courses/Reviews.jsx";

/* LAYOUT */
import Layout from "./components/Layout/Layout.jsx";
import Ulayout from "./components/Layout/Ulayout.jsx";
import Dlayout from "./components/Layout/Dlayout.jsx";

const Analytics = lazy(() => import("./pages/Courses/Analytics"));
const Mycertificates = lazy(() => import("./pages/Courses/Mycertificates"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* PUBLIC */}
        <Route element={<Dlayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createaccount" element={<Createaccount />} />
        </Route>

        {/* USER */}
        <Route element={<Ulayout />}>
        <Route path="/course" element={<Course />} />
        <Route path="/coursedetails" element={<Coursedetails />} />
        <Route path="/udashboard" element={<Udashboard />} />
        <Route path="/mycertificates" element={<Mycertificates />} />
         <Route path="/mycourses" element={<Mycourses />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/challenges" element={<Challenges />} />
         </Route>

        {/* 🔥 ADMIN (WITH LAYOUT) */}
        <Route element={<Layout />}>
          <Route path="/adashboard" element={<Adashboard />} />
          <Route path="/stud" element={<Stud />} />
          <Route path="/acourse" element={<Acourse />} />
          <Route path="/mentors" element={<Mentors />} />
           <Route path="/analytics" element={<Analytics />} />
            <Route path="/addstudent" element={<Addstudent />} />
            <Route path="/manage-challenges/:courseId" element={<ManageChallenges />} />
            <Route path="/reviews" element={<Reviews />} />
          
        
        </Route>

      </Routes>
      </Suspense>

      <ToastContainer position="top-right" autoClose={2000} />

    </BrowserRouter>
  </StrictMode>
);