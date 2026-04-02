import apiClient from "./apiClient";

export const login = (email, password) => apiClient.post("/user/login", { email, password });
export const forgotPassword = (email) => apiClient.post("/user/forgot-password", { email });
export const verifyOtp = (email, otp) => apiClient.post("/user/verify-otp", { email, otp });
export const resetPassword = (data) => apiClient.post("/user/reset-password", data);
export const register = (data) => apiClient.post("/user/register", data);
export const verifyRegistration = (data) => apiClient.post("/user/verify-registration", data);
