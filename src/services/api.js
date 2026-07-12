const API_BASE_URL = "http://localhost:5000/api";

// A small helper that every page will use to talk to the backend
async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();

  if (!response.ok) {
    // Backend sends { success: false, message: "..." } on errors
    throw new Error(data.message || data.errors?.[0]?.msg || "Something went wrong");
  }

  return data;
}

// ===== Auth =====
export function registerUser({ name, email, password }) {
  return apiRequest("/auth/register", "POST", { name, email, password });
}

export function loginUser({ email, password }) {
  return apiRequest("/auth/login", "POST", { email, password });
}

// ===== Parking =====
export function getParkingLots() {
  return apiRequest("/parking", "GET");
}

export function getParkingLotById(id) {
  return apiRequest(`/parking/${id}`, "GET");
}

// ===== Bookings =====
export function createBooking(bookingData, token) {
  return apiRequest("/bookings", "POST", bookingData, token);
}

export function getUserBookings(userId, token) {
  return apiRequest(`/bookings/user/${userId}`, "GET", null, token);
}

export function cancelBooking(bookingId, token) {
  return apiRequest(`/bookings/${bookingId}/cancel`, "PUT", null, token);
}

export function updateProfile({ name, phone }, token) {
  return apiRequest("/auth/profile", "PUT", { name, phone }, token);
}

// ===== Admin =====
export function getDashboardStats(token) {
  return apiRequest("/dashboard", "GET", null, token);
}

export function getAllBookings(token) {
  return apiRequest("/bookings", "GET", null, token);
}

export function createParkingLot(lotData, token) {
  return apiRequest("/parking", "POST", lotData, token);
}