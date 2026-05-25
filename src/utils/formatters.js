/* ================= FORMAT DATE ================= */

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
};

/* ================= FORMAT PRICE ================= */

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

/* ================= FORMAT STUDENTS ================= */

export const formatStudents = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`;
  }

  return count;
};

/* ================= FORMAT DURATION ================= */

export const formatDuration = (hours) => {
  return `${hours} Hours`;
};

/* ================= FORMAT PERCENTAGE ================= */

export const formatPercentage = (value) => {
  return `${value}%`;
};