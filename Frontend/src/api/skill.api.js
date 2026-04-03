import apiClient from "./apiClient";

export const getAllSkills = () => apiClient.get("/skills");
export const createSkill = (data) => apiClient.post("/skills", data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateSkill = (id, data) => apiClient.put(`/skills/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteSkill = (id) => apiClient.delete(`/skills/${id}`);
