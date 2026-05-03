import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= LOGIN =================
export const loginUser = (email, password) => {
  return api.post("/login", { email, password });
};

// ================= PREDICT =================
export const predictEmail = (text, model, userId) => {
  return api.post("/predict", {
    text,
    model,
    user_id: userId,
  });
};

// ================= HISTORY =================
export const getHistory = (userId) => {
  return api.get(`/history/${userId}`);
};

// ================= ANALYTICS =================
export const getAnalytics = (userId) => {
  return api.get(`/analytics/${userId}`);
};

export default api;