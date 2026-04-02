import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // OTP State
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("OTP sent to your email.");
      setStep(2);
    } else {
      toast.error("Please enter your email.");
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

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
      setIsSuccess(true);
      setTimeout(() => {
        toast.success("OTP verified.");
        setStep(3);
        setIsSuccess(false);
      }, 1000); // 600ms for animation + 400ms buffer
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length >= 6) {
      toast.success("Password reset successfully! Please log in.");
      navigate("/admin/login");
    } else {
      toast.error("Password must be at least 6 characters.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-600/10 blur-3xl -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-cyan-800/30 rounded-2xl p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm">
            {step === 1 && "Enter your email to receive an OTP."}
            {step === 2 && "Enter the 6-digit OTP sent to your email."}
            {step === 3 && "Create a new strong password."}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-500"
                placeholder="admin@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">6-Digit OTP</label>
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
                    className={`w-12 h-14 text-center text-xl font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                      ${isSuccess 
                        ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                        : "bg-white/5 border border-white/10 text-white focus:border-cyan-500/50"
                      }
                    `}
                    style={{
                      transitionDelay: isSuccess ? `${index * 100}ms` : "0ms",
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSuccess}
              className={`w-full py-3 text-white rounded-lg font-bold transition-all duration-500 shadow-lg 
                ${isSuccess 
                  ? "bg-green-600 shadow-green-500/30 scale-[1.02]" 
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/20"
                }
              `}
            >
              {isSuccess ? "Verified!" : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20"
            >
              Reset Password
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/admin/login" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
            &larr; Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
