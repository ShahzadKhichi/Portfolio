export interface IUserService {
    login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string } | null>;
    forgotPassword(email: string): Promise<boolean>;
    verifyOtp(email: string, otp: string): Promise<boolean>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<boolean>;
    register(adminData: any): Promise<boolean>;
    verifyRegistration(email: string, otp: string): Promise<boolean>;
}
