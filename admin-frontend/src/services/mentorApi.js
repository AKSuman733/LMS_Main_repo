const API_BASE_URL = "http://localhost:5000/api/mentors";

export const getMentors = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch mentors");
  }

  return result.data;
};

export const createMentor = async (mentorData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mentorData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create mentor");
  }

  return result.data;
};

export const updateMentor = async (id, mentorData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mentorData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update mentor");
  }

  return result.data;
};

export const deleteMentor = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete mentor");
  }

  return result;
};