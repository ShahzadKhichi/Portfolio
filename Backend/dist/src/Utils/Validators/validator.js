"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = exports.resetPasswordSchema = exports.verifyOtpSchema = exports.forgotPasswordSchema = exports.verifyRegistrationSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.registerSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    firstname: zod_1.default.string().min(3),
    lastname: zod_1.default.string().min(3),
});
exports.verifyRegistrationSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    otp: zod_1.default.string().length(6),
});
exports.forgotPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
});
exports.verifyOtpSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    otp: zod_1.default.string().length(6),
});
exports.resetPasswordSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    otp: zod_1.default.string().length(6),
    newPassword: zod_1.default.string().min(6),
});
exports.projectSchema = zod_1.default.object({
    title: zod_1.default.string().min(3),
    description: zod_1.default.string().min(5),
    image: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
    tags: zod_1.default.preprocess((val) => {
        if (typeof val === "string") {
            try {
                return JSON.parse(val);
            }
            catch {
                return val.split(",").map((s) => s.trim());
            }
        }
        return val;
    }, zod_1.default.array(zod_1.default.string()).optional()),
    github: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
    live: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
});
