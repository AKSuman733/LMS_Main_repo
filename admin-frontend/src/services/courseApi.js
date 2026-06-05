const API_BASE_URL = "http://localhost:5000/api/courses";

export const getCourses = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch courses");
  }

  return result.data;
};

export const createCourse = async (courseData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create course");
  }

  return result.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courseData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update course");
  }

  return result.data;
};

export const deleteCourse = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete course");
  }

  return result;
};