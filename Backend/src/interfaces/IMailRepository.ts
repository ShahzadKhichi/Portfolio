import { IMail } from "../Models/Mail.Model";

export interface IMailRepository {
    createMail(from: string, name: string, message: string): Promise<IMail>;
}
