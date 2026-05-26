import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  ToastContainer
} from "react-toastify";

import
"react-toastify/dist/ReactToastify.css";

import User from "./pages/auth/User.jsx";
import Admin from "./pages/auth/Admin.jsx";
import Createaccount from "./pages/auth/Createaccount.jsx";

import Course from "./pages/courses/Course.jsx";
import Coursedetails from "./pages/courses/Coursedetails.jsx";
import Acourse from "./pages/courses/Acourse.jsx";

import Udashboard from "./pages/Dashboard/Udashboard.jsx";
import Adashboard from "./pages/Dashboard/Adashboard.jsx";
import Stud from "./pages/Dashboard/Stud.jsx";

import Mentors from "./pages/courses/Mentors.jsx";
import Mycourses from "./pages/courses/Mycourses.jsx";
import Mycertificates from "./pages/courses/Mycertificates.jsx";

import "./styles/global.css";

createRoot(
  document.getElementById("root")
).render(

  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/user"
          element={<User />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/createaccount"
          element={<Createaccount />}
        />

        <Route
          path="/course"
          element={<Course />}
        />

        <Route
          path="/udashboard"
          element={<Udashboard />}
        />

        <Route
          path="/coursedetails"
          element={<Coursedetails />}
        />

        <Route
          path="/adashboard"
          element={<Adashboard />}
        />

        <Route
          path="/stud"
          element={<Stud />}
        />

        <Route
          path="/acourse"
          element={<Acourse />}
        />

        <Route
          path="/mentors"
          element={<Mentors />}
        />

        <Route
          path="/mycourses"
          element={<Mycourses />}
        />

        <Route
          path="/mycertificates"
          element={<Mycertificates />}
        />

      </Routes>

      {/* TOAST CONTAINER */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

    </BrowserRouter>

  </StrictMode>
);