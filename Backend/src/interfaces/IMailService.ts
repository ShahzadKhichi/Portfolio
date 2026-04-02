export interface IMailService {
    processIncomingMail(email: string, name: string, message: string): Promise<void>;
}
