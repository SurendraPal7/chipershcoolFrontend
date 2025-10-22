import axios from "axios";

// ✅ Create Axios instance
export const api = axios.create({
  baseURL: "https://chipershcool-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// ✅ Attach JWT Token Automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global Response Handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("⚠️ Could not connect to backend. Make sure the backend is running!");
    } else if (error.response.status === 401) {
      // Session expired or unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      console.warn("Session expired. Redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

/* ──────────────────────────────────────────────
   🔹 Convenience Helpers for IDE Page
────────────────────────────────────────────── */

// ✅ Fetch files for a given project
export const getProjectFiles = async (projectId) => {
  const res = await api.get(`/projects/${projectId}`);
  return res.data?.data?.files || [];
};

export const saveProjectToBackend = async (payload) => {
  const res = await api.post("/projects/save", payload);
  return res.data;
};
