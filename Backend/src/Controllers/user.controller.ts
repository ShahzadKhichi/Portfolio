import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IUserService } from "../interfaces/IUserService";

@injectable()
export class UserController {
  constructor(
      @inject(TYPES.IUserService) private userService: IUserService
  ) {}

  public login = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({
        message: "internal server error",
        success: false,
      });
    }
  };

  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const success = await this.userService.forgotPassword(email);

      if (!success) {
        res.status(404).json({ message: "User with this email not found.", success: false });
        return;
      }

      res.status(200).json({ message: "OTP sent to email successfully.", success: true });
    } catch (error) {
      console.error("Forgot Password Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
      const isValid = await this.userService.verifyOtp(email, otp);

      if (!isValid) {
        res.status(400).json({ message: "Invalid or expired OTP.", success: false });
        return;
      }

      res.status(200).json({ message: "OTP verified successfully.", success: true });
    } catch (error) {
      console.error("Verify OTP Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp, newPassword } = req.body;
      const success = await this.userService.resetPassword(email, otp, newPassword);

      if (!success) {
        res.status(400).json({ message: "Invalid or expired OTP.", success: false });
        return;
      }

      res.status(200).json({ message: "Password reset successfully.", success: true });
    } catch (error) {
      console.error("Reset Password Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const success = await this.userService.register(req.body);
      if (!success) {
        res.status(400).json({ message: "User already exists or invalid data.", success: false });
        return;
      }
      res.status(201).json({ message: "Registration initiated. OTP sent to email.", success: true });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public verifyRegistration = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;
      const isValid = await this.userService.verifyRegistration(email, otp);

      if (!isValid) {
        res.status(400).json({ message: "Invalid or expired OTP, or already verified.", success: false });
        return;
      }

      res.status(200).json({ message: "Registration verified successfully. You can now login.", success: true });
    } catch (error) {
      console.error("Verify Registration Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };
}
