const API_BASE_URL = "http://localhost:5000/api/course-enrollments";

export const getCourseEnrollments = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch course enrollments");
  }

  return result.data;
};

export const updateCourseEnrollment = async (id, enrollmentData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollmentData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update course enrollment");
  }

  return result.data;
};

export const deleteCourseEnrollment = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete course enrollment");
  }

  return result;
};
