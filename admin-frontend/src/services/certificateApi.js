const API_BASE_URL = "http://localhost:5000/api/certificates";

export const getCertificates = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch certificates");
  }

  return result.data;
};

export const createCertificate = async (certificateData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(certificateData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create certificate");
  }

  return result.data;
};

export const updateCertificate = async (id, certificateData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(certificateData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update certificate");
  }

  return result.data;
};

export const deleteCertificate = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete certificate");
  }

  return result;
};

export const verifyCertificate = async (certificateNumber) => {
  const response = await fetch(`${API_BASE_URL}/verify/${certificateNumber}`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Certificate not found");
  }

  return result.data;
};