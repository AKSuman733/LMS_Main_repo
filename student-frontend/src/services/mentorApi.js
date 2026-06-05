const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const MENTOR_API_URL = `${API_BASE_URL}/mentors`;

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const getMentors = async () => {
  const response = await fetch(MENTOR_API_URL);
  const result = await handleResponse(response);
  return result.data || [];
};

export const getMentorById = async (id) => {
  const response = await fetch(`${MENTOR_API_URL}/${id}`);
  const result = await handleResponse(response);
  return result.data;
};