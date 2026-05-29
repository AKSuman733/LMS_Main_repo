const API_BASE_URL = "http://localhost:5000/api/students";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

export const sendStudentOtp = async ({ name, email, phone }) => {
  const response = await fetch(`${API_BASE_URL}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
    }),
  });

  return handleResponse(response);
};

export const verifyStudentOtp = async ({ email, otp }) => {
  const response = await fetch(`${API_BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });

  const result = await handleResponse(response);

  if (result.token && result.data) {
    localStorage.setItem("studentToken", result.token);
    localStorage.setItem(
      "studentUser",
      JSON.stringify({
        _id: result.data._id,
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        role: "student",
        provider: "otp",
        isEmailVerified: result.data.isEmailVerified,
      })
    );
  }

  return result;
};

export const getStudents = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await handleResponse(response);
  return result.data || [];
};

export const createStudent = async (studentData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return handleResponse(response);
};

export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return handleResponse(response);
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
};