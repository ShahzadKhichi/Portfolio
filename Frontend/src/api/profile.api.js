import apiClient from "./apiClient";

export const getProfile = () => apiClient.get("/profile");
export const incrementViews = () => apiClient.post("/profile/views/increment");
export const updateProfile = (formData) => apiClient.put("/profile", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const getPublicProfile = () => apiClient.get("/profile/public");
