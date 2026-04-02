"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserService = class UserService {
    constructor(userRepository, mailSender) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }
    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.isVerified === false)
            return null;
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return null;
        const JWTSec = process.env.JWT_SECRET || "default_super_secret_for_jwt";
        const JWTRefreshSec = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";
        const payload = { id: user._id, email: user.email };
        const accessToken = jsonwebtoken_1.default.sign(payload, JWTSec, { expiresIn: "15m" });
        const refreshToken = jsonwebtoken_1.default.sign(payload, JWTRefreshSec, { expiresIn: "7d" });
        return { accessToken, refreshToken };
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            return false;
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // 10 minutes expiry
        await this.userRepository.updateAdmin(email, { resetOtp: otp, resetOtpExpiry: otpExpiry });
        try {
            await this.mailSender.sendMail(email, "Your Password Reset OTP", `<p>Your OTP for password reset is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`);
        }
        catch (error) {
            console.error("Failed to send forgot password email:", error);
            return false;
        }
        return true;
    }
    async verifyOtp(email, otp) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.resetOtp !== otp || !user.resetOtpExpiry)
            return false;
        if (new Date() > user.resetOtpExpiry) {
            return false; // OTP Expired
        }
        return true;
    }
    async resetPassword(email, otp, newPassword) {
        const isValid = await this.verifyOtp(email, otp);
        if (!isValid)
            return false;
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, salt);
        // Update password and clear OTP
        await this.userRepository.updateAdmin(email, {
            password: hashedPassword,
            resetOtp: undefined,
            resetOtpExpiry: undefined
        });
        return true;
    }
    async register(adminData) {
        const existingUser = await this.userRepository.findByEmail(adminData.email);
        // If the user already exists and is fully verified, stop them
        if (existingUser && existingUser.isVerified)
            return false;
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(adminData.password, salt);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        if (existingUser && !existingUser.isVerified) {
            // Overwrite unverified user
            await this.userRepository.updateAdmin(adminData.email, {
                password: hashedPassword,
                name: { firstname: adminData.firstname, lastname: adminData.lastname },
                registrationOtp: otp,
                registrationOtpExpiry: otpExpiry
            });
        }
        else {
            // New creation
            await this.userRepository.createAdmin({
                email: adminData.email,
                password: hashedPassword,
                name: { firstname: adminData.firstname, lastname: adminData.lastname },
                isVerified: false,
                registrationOtp: otp,
                registrationOtpExpiry: otpExpiry
            });
        }
        try {
            await this.mailSender.sendMail(adminData.email, "Verify your Admin Registration", `<p>Your OTP for registration verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`);
        }
        catch (error) {
            console.error("Failed to send registration email:", error);
            // We can leave the unverified model in the DB, because if they try again, 
            // the logic above successfully overwrites their unverified credentials.
            return false;
        }
        return true;
    }
    async verifyRegistration(email, otp) {
        const user = await this.userRepository.findByEmail(email);
        // Only verify if user exists, is NOT verified already, OTP matches, and hasn't expired.
        if (!user || user.isVerified || user.registrationOtp !== otp || !user.registrationOtpExpiry)
            return false;
        if (new Date() > user.registrationOtpExpiry) {
            return false; // OTP Expired
        }
        // Complete Verification
        await this.userRepository.updateAdmin(email, {
            isVerified: true,
            registrationOtp: undefined,
            registrationOtpExpiry: undefined
        });
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.IUserRepository)),
    __param(1, (0, tsyringe_1.inject)(types_1.TYPES.IMailSender)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
