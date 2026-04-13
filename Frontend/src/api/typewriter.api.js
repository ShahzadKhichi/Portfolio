import api from "./apiClient";

export const getAllTypewriters = () => api.get(`/typewriter`);

export const createTypewriter = (data) => 
  api.post(`/typewriter`, data, { headers: getAuthHeader() });

export const updateTypewriter = (id, data) => 
  api.put(`/typewriter/${id}`, data, { headers: getAuthHeader() });

export const deleteTypewriter = (id) => 
  api.delete(`/typewriter/${id}`, { headers: getAuthHeader() });
