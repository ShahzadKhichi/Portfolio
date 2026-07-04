import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { UserController } from "../Controllers/user.controller";
import { validateBody } from "../Middlewares/validateBody";
import { authenticate } from "../Middlewares/auth.middleware";
import { loginSchema, forgotPasswordSchema, verifyOtpSchema, resetPasswordSchema, registerSchema, verifyRegistrationSchema, updateProfileSchema } from "../Utils/Validators/validator";
import { authLimiter } from "../Middlewares/rateLimiter";

const router = Router();
const userController = container.resolve<UserController>(TYPES.UserController);

router.post("/register", authLimiter, validateBody(registerSchema), userController.register);
router.post("/verify-registration", authLimiter, validateBody(verifyRegistrationSchema), userController.verifyRegistration);

router.post("/login", authLimiter, validateBody(loginSchema), userController.login);
router.post("/forgot-password", authLimiter, validateBody(forgotPasswordSchema), userController.forgotPassword);
router.post("/verify-otp", authLimiter, validateBody(verifyOtpSchema), userController.verifyOtp);
router.post("/reset-password", authLimiter, validateBody(resetPasswordSchema), userController.resetPassword);

// Private Routes
router.get("/me", authenticate, userController.getMe);
router.put("/profile", authenticate, validateBody(updateProfileSchema), userController.updateProfile);

export default router;
