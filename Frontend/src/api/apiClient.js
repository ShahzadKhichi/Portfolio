import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL+"api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // In a real app, we'd use the refreshToken here.
      // For now, we'll just redirect to login if unauthorized.
      localStorage.removeItem("accessToken");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default api;
