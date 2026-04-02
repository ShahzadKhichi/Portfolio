"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillSchema = exports.profileSchema = exports.projectSchema = exports.resetPasswordSchema = exports.verifyOtpSchema = exports.forgotPasswordSchema = exports.verifyRegistrationSchema = exports.registerSchema = exports.loginSchema = void 0;
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
exports.profileSchema = zod_1.default.object({
    bio: zod_1.default.string().min(10),
    phoneNumber: zod_1.default.string().optional(),
    location: zod_1.default.string().optional(),
    resumeUrl: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
    socialLinks: zod_1.default.preprocess((val) => {
        if (typeof val === "string") {
            try {
                return JSON.parse(val);
            }
            catch {
                return val;
            }
        }
        return val;
    }, zod_1.default.object({
        github: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
        linkedin: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
        twitter: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
        instagram: zod_1.default.string().url().optional().or(zod_1.default.literal("")),
    }).optional()),
});
exports.skillSchema = zod_1.default.object({
    name: zod_1.default.string().min(2),
    level: zod_1.default.coerce.number().min(0).max(100),
    category: zod_1.default.enum(["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"]),
    icon: zod_1.default.string().optional(),
});
