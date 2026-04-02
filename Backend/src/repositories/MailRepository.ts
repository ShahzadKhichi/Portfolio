import { injectable } from "tsyringe";
import Mail, { IMail } from "../Models/Mail.Model";
import { IMailRepository } from "../interfaces/IMailRepository";

@injectable()
export class MailRepository implements IMailRepository {
    public async createMail(from: string, name: string, message: string): Promise<IMail> {
        return await Mail.create({ from, name, message });
    }

    public async getAllMails(): Promise<IMail[]> {
        return await Mail.find().sort({ createdAt: -1 });
    }

    public async deleteMail(id: string): Promise<IMail | null> {
        return await Mail.findByIdAndDelete(id);
    }
}
