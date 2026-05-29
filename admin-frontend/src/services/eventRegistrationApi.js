const API_BASE_URL = "http://localhost:5000/api/event-registrations";

export const getEventRegistrations = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch event registrations");
  }

  return result.data;
};

export const createEventRegistration = async (registrationData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create event registration");
  }

  return result.data;
};

export const updateEventRegistration = async (id, registrationData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update event registration");
  }

  return result.data;
};

export const deleteEventRegistration = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete event registration");
  }

  return result;
};