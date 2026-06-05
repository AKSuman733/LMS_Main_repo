const API_BASE_URL = "http://localhost:5000/api/events";

export const getEvents = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch events");
  }

  return result.data;
};

export const createEvent = async (eventData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create event");
  }

  return result.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update event");
  }

  return result.data;
};

export const deleteEvent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete event");
  }

  return result;
};