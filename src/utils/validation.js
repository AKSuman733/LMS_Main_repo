export const validateEmail = (email) => {

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Email is required";
  }

  if (!emailRegex.test(email)) {
    return "Please enter valid email";
  }

  return "";
};

export const validatePassword = (password) => {

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Minimum 6 characters";
  }

  return "";
};

export const getPasswordStrength = (password) => {

  if (password.length < 4) {
    return "weak";
  }

  if (
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    return "strong";
  }

  return "medium";
};