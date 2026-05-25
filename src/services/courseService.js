import api from "./api";

/* ================= GET ALL COURSES ================= */

export const getCourses = async () => {
  try {
    const response = await api.get("/courses");

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= GET SINGLE COURSE ================= */

export const getCourseById = async (id) => {
  try {
    const response = await api.get(
      `/courses/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= ENROLL COURSE ================= */

export const enrollCourse = async (id) => {
  try {
    const response = await api.post(
      `/courses/enroll/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= WATCH COURSE ================= */

export const watchCourse = async (id) => {
  try {
    const response = await api.get(
      `/courses/watch/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= GET MY COURSES ================= */

export const getMyCourses = async () => {
  try {
    const response = await api.get(
      "/courses/my-courses"
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= ADMIN CREATE COURSE ================= */

export const createCourse = async (courseData) => {
  try {
    const response = await api.post(
      "/admin/courses",
      courseData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= ADMIN DELETE COURSE ================= */

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(
      `/admin/courses/${id}`
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};