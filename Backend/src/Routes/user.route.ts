import { Router } from "express";
import { container } from "../container";
import { TYPES } from "../interfaces/types";
import { UserController } from "../Controllers/user.controller";
import { validateBody } from "../Middlewares/validateBody";
import { loginSchema, forgotPasswordSchema, verifyOtpSchema, resetPasswordSchema, registerSchema, verifyRegistrationSchema } from "../Utils/Validators/validator";

const router = Router();
const userController = container.resolve<UserController>(TYPES.UserController);

router.post("/register", validateBody(registerSchema), userController.register);
router.post("/verify-registration", validateBody(verifyRegistrationSchema), userController.verifyRegistration);

router.post("/login", validateBody(loginSchema), userController.login);
router.post("/forgot-password", validateBody(forgotPasswordSchema), userController.forgotPassword);
router.post("/verify-otp", validateBody(verifyOtpSchema), userController.verifyOtp);
router.post("/reset-password", validateBody(resetPasswordSchema), userController.resetPassword);

export default router;
