import { IMail } from "../Models/Mail.Model";

export interface IMailRepository {
    createMail(from: string, name: string, message: string): Promise<IMail>;
    getAllMails(): Promise<IMail[]>;
    deleteMail(id: string): Promise<IMail | null>;
}
