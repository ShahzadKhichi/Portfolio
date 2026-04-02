import apiClient from "./apiClient";

export const getAllMessages = () => apiClient.get("/messages");
export const deleteMessage = (id) => apiClient.delete(`/messages/${id}`);
export const sendMessage = (data) => apiClient.post("/api/contact", data); // This matches your backend public contact route
