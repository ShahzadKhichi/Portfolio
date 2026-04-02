export interface IMailSender {
    sendMail(email: string, title: string, body: string): Promise<any>;
}
