import api from "./api";

/* ================= LOGIN ================= */

export const loginUser = async (userData) => {
  try {
    const response = await api.post(
      "/auth/login",
      userData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= REGISTER ================= */

export const registerUser = async (userData) => {
  try {
    const response = await api.post(
      "/auth/register",
      userData
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= FORGOT PASSWORD ================= */

export const forgotPassword = async (email) => {
  try {
    const response = await api.post(
      "/auth/forgot-password",
      { email }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/* ================= GET PROFILE ================= */

export const getProfile = async () => {
  try {
    const response = await api.get(
      "/auth/profile"
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};