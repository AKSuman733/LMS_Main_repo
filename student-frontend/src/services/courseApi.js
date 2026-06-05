const API_BASE_URL = "http://localhost:5000/api/courses";

export const getCourses = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch courses");
  }

  return result.data;
};