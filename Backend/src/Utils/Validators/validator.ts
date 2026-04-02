
import z from "zod";
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),

});

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstname: z.string().min(3),
    lastname: z.string().min(3),
});

export const verifyRegistrationSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(6),
});

export const projectSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(5),
    image: z.string().url().optional().or(z.literal("")),
    tags: z.preprocess(
        (val) => {
            if (typeof val === "string") {
                try { return JSON.parse(val); } catch { return val.split(",").map((s) => s.trim()); }
            }
            return val;
        },
        z.array(z.string()).optional()
    ),
    github: z.string().url().optional().or(z.literal("")),
    live: z.string().url().optional().or(z.literal("")),
});

