const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const URL = `${API_BASE_URL}/course-enrollments`;

const parse = async (response) => {
  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; }
  catch { throw new Error(`Backend returned non-JSON response (${response.status}).`); }
  if (!response.ok || data.success === false) throw new Error(data.message || "Request failed");
  return data;
};

export const getCourseEnrollments = async () => (await parse(await fetch(URL))).data || [];
export const getCourseEnrollmentById = async (id) => (await parse(await fetch(`${URL}/${id}`))).data;
export const getEnrollmentsByStudentEmail = async (email) => {
  if (!email) return [];
  return (await parse(await fetch(`${URL}/student/${encodeURIComponent(email)}`))).data || [];
};
export const createCourseEnrollment = async (body) => (await parse(await fetch(URL, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
}))).data;
export const updateLearningProgress = async (id, body) => (await parse(await fetch(`${URL}/${id}/progress`, {
  method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
}))).data;
export const toggleCourseTopicCompletion = (id, topicId, isCompleted) =>
  updateLearningProgress(id, { type: "topic", topicId, isCompleted });
export const toggleCourseSubTopicCompletion = (id, topicId, subTopicId, isCompleted) =>
  updateLearningProgress(id, { type: "subTopic", topicId, subTopicId, isCompleted });
export const updateQuizStatus = async (id, body) => (await parse(await fetch(`${URL}/${id}/quiz`, {
  method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
}))).data;
export const updateAssignmentStatus = async (id, body) => (await parse(await fetch(`${URL}/${id}/assignment`, {
  method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
}))).data;
export const uploadAssignmentFile = async (id, file) => {
  const formData = new FormData();
  formData.append("assignment", file);
  return (await parse(await fetch(`${URL}/${id}/assignment/upload`, { method: "POST", body: formData }))).data;
};
export const saveEnrollmentNotes = async (id, notes) =>
  (await parse(await fetch(`${URL}/${id}/notes`, {
    method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes }),
  }))).data;
export const addEnrollmentComment = async (id, body) =>
  (await parse(await fetch(`${URL}/${id}/comments`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  }))).data;
export const deleteCourseEnrollment = async (id) => parse(await fetch(`${URL}/${id}`, { method: "DELETE" }));