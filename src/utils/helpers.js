/* ================= TRUNCATE TEXT ================= */

export const truncateText = (
  text,
  maxLength = 100
) => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
};

/* ================= GENERATE RANDOM ID ================= */

export const generateId = () => {
  return Math.random()
    .toString(36)
    .substring(2, 10);
};

/* ================= SCROLL TO TOP ================= */

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* ================= SAVE TO LOCAL STORAGE ================= */

export const saveToLocalStorage = (
  key,
  value
) => {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
};

/* ================= GET FROM LOCAL STORAGE ================= */

export const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

/* ================= REMOVE FROM LOCAL STORAGE ================= */

export const removeFromLocalStorage = (
  key
) => {
  localStorage.removeItem(key);
};

/* ================= DEBOUNCE FUNCTION ================= */

export const debounce = (func, delay = 500) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};