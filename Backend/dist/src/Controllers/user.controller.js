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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                // Authenticate
                const tokens = await this.userService.login(email, password);
                if (!tokens) {
                    res.status(401).json({
                        message: "Invalid email or password",
                        success: false,
                    });
                    return;
                }
                // Configure Cookies
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
                res.status(200).json({
                    message: "Login successful",
                    success: true,
                    accessToken: tokens.accessToken
                });
            }
            catch (error) {
                console.error("Login Error:", error);
                res.status(500).json({
                    message: "internal server error",
                    success: false,
                });
            }
        };
        this.forgotPassword = async (req, res) => {
            try {
                const { email } = req.body;
                const success = await this.userService.forgotPassword(email);
                if (!success) {
                    res.status(404).json({ message: "User with this email not found.", success: false });
                    return;
                }
                res.status(200).json({ message: "OTP sent to email successfully.", success: true });
            }
            catch (error) {
                console.error("Forgot Password Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.verifyOtp = async (req, res) => {
            try {
                const { email, otp } = req.body;
                const isValid = await this.userService.verifyOtp(email, otp);
                if (!isValid) {
                    res.status(400).json({ message: "Invalid or expired OTP.", success: false });
                    return;
                }
                res.status(200).json({ message: "OTP verified successfully.", success: true });
            }
            catch (error) {
                console.error("Verify OTP Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.resetPassword = async (req, res) => {
            try {
                const { email, otp, newPassword } = req.body;
                const success = await this.userService.resetPassword(email, otp, newPassword);
                if (!success) {
                    res.status(400).json({ message: "Invalid or expired OTP.", success: false });
                    return;
                }
                res.status(200).json({ message: "Password reset successfully.", success: true });
            }
            catch (error) {
                console.error("Reset Password Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.register = async (req, res) => {
            try {
                const success = await this.userService.register(req.body);
                if (!success) {
                    res.status(400).json({ message: "User already exists or invalid data.", success: false });
                    return;
                }
                res.status(201).json({ message: "Registration initiated. OTP sent to email.", success: true });
            }
            catch (error) {
                console.error("Register Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
        this.verifyRegistration = async (req, res) => {
            try {
                const { email, otp } = req.body;
                const isValid = await this.userService.verifyRegistration(email, otp);
                if (!isValid) {
                    res.status(400).json({ message: "Invalid or expired OTP, or already verified.", success: false });
                    return;
                }
                res.status(200).json({ message: "Registration verified successfully. You can now login.", success: true });
            }
            catch (error) {
                console.error("Verify Registration Error:", error);
                res.status(500).json({ message: "internal server error", success: false });
            }
        };
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.IUserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
