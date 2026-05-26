import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import * as authApi from "../../api/auth.api";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // OTP State
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.forgotPassword(email);
      if (response.data.success) {
        toast.success("OTP sent to your email.");
        setStep(2);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val && e.target.value !== "") return;

    // Take only the last character entered if someone types fast
    const digit = val.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    // Focus last filled input or end
    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.verifyOtp(email, otpString);
      if (response.data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          toast.success("OTP verified.");
          setStep(3);
          setIsSuccess(false);
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      toast.error(error.response?.data?.message || "Invalid or expired OTP.");
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.resetPassword({
        email,
        otp: otp.join(""),
        newPassword
      });
      if (response.data.success) {
        toast.success("Password reset successfully! Please log in.");
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-hover/5 blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-text-secondary text-sm">
            {step === 1 && "Enter your email to receive an OTP."}
            {step === 2 && "Enter the 6-digit OTP sent to your email."}
            {step === 3 && "Create a new strong password."}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-secondary/50"
                placeholder="admin@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-md shadow-accent/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">6-Digit OTP</label>
              <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2
                      ${isSuccess 
                        ? "bg-green-500/20 border-green-500 text-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                        : "bg-bg-alt border border-border text-text focus:border-accent focus:ring-accent/50"
                      }
                    `}
                    disabled={loading || isSuccess}
                    style={{
                      transitionDelay: isSuccess ? `${index * 100}ms` : "0ms",
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || isSuccess}
              className={`w-full py-3 text-white rounded-lg font-bold transition-all duration-500 shadow-lg 
                ${isSuccess 
                  ? "bg-green-600 shadow-green-500/30 scale-[1.02]" 
                  : (loading ? "bg-accent opacity-70 cursor-not-allowed" : "bg-accent hover:bg-accent-hover shadow-accent/20")
                }
              `}
            >
              {isSuccess ? "Verified!" : (loading ? "Verifying..." : "Verify OTP")}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-bg-alt border border-border rounded-lg text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-text-secondary/50"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-lg transition-all shadow-md shadow-accent/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/admin/login" className="text-text-secondary hover:text-accent text-sm transition-colors font-semibold">
            &larr; Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
