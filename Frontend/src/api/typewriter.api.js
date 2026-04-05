import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const getAuthHeader = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return admin?.token ? { Authorization: `Bearer ${admin.token}` } : {};
};

export const getAllTypewriters = () => axios.get(`${API_URL}/typewriter`);

export const createTypewriter = (data) => 
  axios.post(`${API_URL}/typewriter`, data, { headers: getAuthHeader() });

export const updateTypewriter = (id, data) => 
  axios.put(`${API_URL}/typewriter/${id}`, data, { headers: getAuthHeader() });

export const deleteTypewriter = (id) => 
  axios.delete(`${API_URL}/typewriter/${id}`, { headers: getAuthHeader() });
