const API_BASE_URL = "http://localhost:5000/api/course-enrollments";

const parseResponse = async (response) => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      "Backend JSON nahi bhej raha. Check karo /api/course-enrollments route working hai ya nahi."
    );
  }
};

export const getEnrollmentsByStudentEmail = async (email) => {
  const response = await fetch(
    `${API_BASE_URL}/student/${encodeURIComponent(email)}`
  );

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch enrollments");
  }

  return result.data || [];
};

export const createCourseEnrollment = async (enrollmentData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollmentData),
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new Error(result.message || "Failed to enroll in course");
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

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new Error(result.message || "Failed to update enrollment");
  }

  return result.data;
};

export const toggleCourseTopicCompletion = async (id, topicData) => {
  const response = await fetch(`${API_BASE_URL}/${id}/toggle-topic`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(topicData),
  });

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new Error(result.message || "Failed to update topic progress");
  }

  return result.data;
};