import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IMailSender } from "../interfaces/IMailSender";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
        @inject(TYPES.IMailSender) private mailSender: IMailSender
    ) {}

    public async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string } | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.isVerified === false) return null;

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) return null;

        const JWTSec = process.env.JWT_SECRET || "default_super_secret_for_jwt";
        const JWTRefreshSec = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";
        
        const payload = { id: user._id, email: user.email };

        const accessToken = jwt.sign(payload, JWTSec, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, JWTRefreshSec, { expiresIn: "7d" });

        return { accessToken, refreshToken };
    }

    public async forgotPassword(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) return false;

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // 10 minutes expiry

        await this.userRepository.updateAdmin(email, { resetOtp: otp, resetOtpExpiry: otpExpiry });

        try {
            await this.mailSender.sendMail(
                email,
                "Your Password Reset OTP",
                `<p>Your OTP for password reset is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
            );
            
        } catch (error) {
            console.error("Failed to send forgot password email:", error);
            return false;
        }

        return true;
    }

    public async verifyOtp(email: string, otp: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || user.resetOtp !== otp || !user.resetOtpExpiry) return false;

        if (new Date() > user.resetOtpExpiry) {
            return false; // OTP Expired
        }

        return true;
    }

    public async resetPassword(email: string, otp: string, newPassword: string): Promise<boolean> {
        const isValid = await this.verifyOtp(email, otp);
        if (!isValid) return false;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        // Update password and clear OTP
        await this.userRepository.updateAdmin(email, { 
            password: hashedPassword,
            resetOtp: undefined,
            resetOtpExpiry: undefined
        });

        return true;
    }

    public async register(adminData: any): Promise<boolean> {
        const existingUser = await this.userRepository.findByEmail(adminData.email);
        
        // If the user already exists and is fully verified, stop them
        if (existingUser && existingUser.isVerified) return false;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(adminData.password, salt);

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
        } else {
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
            await this.mailSender.sendMail(
                adminData.email,
                "Verify your Admin Registration",
                `<p>Your OTP for registration verification is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
            );
        } catch (error) {
            console.error("Failed to send registration email:", error);
            // We can leave the unverified model in the DB, because if they try again, 
            // the logic above successfully overwrites their unverified credentials.
            return false;
        }

        return true;
    }

    public async verifyRegistration(email: string, otp: string): Promise<boolean> {
        const admin = await this.userRepository.findByEmail(email);
        if (!admin || admin.isVerified || admin.registrationOtp !== otp || (admin.registrationOtpExpiry && admin.registrationOtpExpiry < new Date())) {
            return false;
        }

        await this.userRepository.updateAdmin(email, {
            isVerified: true,
            registrationOtp: undefined,
            registrationOtpExpiry: undefined
        });
        return true;
    }

    public async getAdminById(id: string): Promise<any> {
        return await this.userRepository.findById(id);
    }

    public async updateAdmin(id: string, adminData: any): Promise<any> {
        const admin = await this.userRepository.findById(id);
        if (!admin) return null;

        if (adminData.email) admin.email = adminData.email;
        if (adminData.firstname) admin.name.firstname = adminData.firstname;
        if (adminData.lastname) admin.name.lastname = adminData.lastname;

        return await admin.save();
    }
}
