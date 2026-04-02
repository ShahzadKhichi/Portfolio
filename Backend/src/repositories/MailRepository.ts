import { injectable } from "tsyringe";
import Mail, { IMail } from "../Models/Mail.Model";
import { IMailRepository } from "../interfaces/IMailRepository";

@injectable()
export class MailRepository implements IMailRepository {
    public async createMail(from: string, name: string, message: string): Promise<IMail> {
        return await Mail.create({ from, name, message });
    }
}
