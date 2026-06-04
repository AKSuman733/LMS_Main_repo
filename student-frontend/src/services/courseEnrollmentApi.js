const API_BASE_URL = "http://localhost:5000/api";

const COURSE_ENROLLMENT_API_URL = `${API_BASE_URL}/course-enrollments`;

const handleResponse = async (response) => {
  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(
      "Backend se JSON nahi aa raha. Please check backend server and API route."
    );
  }

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const getCourseEnrollments = async () => {
  const response = await fetch(COURSE_ENROLLMENT_API_URL);
  const result = await handleResponse(response);
  return result.data || [];
};

export const getCourseEnrollmentById = async (id) => {
  const response = await fetch(`${COURSE_ENROLLMENT_API_URL}/${id}`);
  const result = await handleResponse(response);
  return result.data;
};

export const getEnrollmentsByStudentEmail = async (email) => {
  if (!email) return [];

  const response = await fetch(
    `${COURSE_ENROLLMENT_API_URL}/student/${encodeURIComponent(email)}`
  );

  const result = await handleResponse(response);
  return result.data || [];
};

export const createCourseEnrollment = async (enrollmentData) => {
  const response = await fetch(COURSE_ENROLLMENT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollmentData),
  });

  const result = await handleResponse(response);
  return result.data;
};

export const updateCourseEnrollment = async (id, enrollmentData) => {
  const response = await fetch(`${COURSE_ENROLLMENT_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollmentData),
  });

  const result = await handleResponse(response);
  return result.data;
};

export const updateLearningProgress = async (enrollmentId, progressData) => {
  const response = await fetch(
    `${COURSE_ENROLLMENT_API_URL}/${enrollmentId}/progress`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progressData),
    }
  );

  const result = await handleResponse(response);
  return result.data;
};

export const toggleCourseTopicCompletion = async (
  enrollmentId,
  topicId,
  isCompleted
) => {
  return updateLearningProgress(enrollmentId, {
    type: "topic",
    topicId,
    isCompleted,
  });
};

export const toggleCourseSubTopicCompletion = async (
  enrollmentId,
  topicId,
  subTopicId,
  isCompleted
) => {
  return updateLearningProgress(enrollmentId, {
    type: "subTopic",
    topicId,
    subTopicId,
    isCompleted,
  });
};

export const updateQuizStatus = async (enrollmentId, quizData) => {
  const response = await fetch(
    `${COURSE_ENROLLMENT_API_URL}/${enrollmentId}/quiz`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    }
  );

  const result = await handleResponse(response);
  return result.data;
};

export const updateAssignmentStatus = async (enrollmentId, assignmentData) => {
  const response = await fetch(
    `${COURSE_ENROLLMENT_API_URL}/${enrollmentId}/assignment`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignmentData),
    }
  );

  const result = await handleResponse(response);
  return result.data;
};

export const deleteCourseEnrollment = async (id) => {
  const response = await fetch(`${COURSE_ENROLLMENT_API_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};