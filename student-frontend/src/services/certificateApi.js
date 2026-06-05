const API_BASE_URL = "http://localhost:5000/api/certificates";

export const getCertificatesByStudentEmail = async (email) => {
  const response = await fetch(
    `${API_BASE_URL}/student/${encodeURIComponent(email)}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch certificates");
  }

  return result.data;
};

export const verifyCertificate = async (certificateNumber) => {
  const response = await fetch(
    `${API_BASE_URL}/verify/${encodeURIComponent(certificateNumber)}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Certificate not found");
  }

  return result.data;
};