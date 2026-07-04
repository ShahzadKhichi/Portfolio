export interface IMailSender {
    sendMail(email: string, title: string, body: string, templateType?: "message" | "otp" | "default", senderName?: string): Promise<any>;
}
