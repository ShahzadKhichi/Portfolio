import apiClient from "./apiClient";

export const getAllProjects = () => apiClient.get("/projects");
export const createProject = (formData) => apiClient.post("/projects", formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const updateProject = (id, formData) => apiClient.put(`/projects/${id}`, formData, {
  headers: { "Content-Type": "multipart/form-data" }
});
export const deleteProject = (id) => apiClient.delete(`/projects/${id}`);
