import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IMail } from "../Models/Mail.Model";
import { IMailRepository } from "../interfaces/IMailRepository";
import { IMessageService } from "../interfaces/IMessageService";

@injectable()
export class MessageService implements IMessageService {
    constructor(
        @inject(TYPES.IMailRepository) private mailRepository: IMailRepository
    ) {}

    public async getMessages(): Promise<IMail[]> {
        return await this.mailRepository.getAllMails();
    }

    public async deleteMessage(id: string): Promise<boolean> {
        const deleted = await this.mailRepository.deleteMail(id);
        return !!deleted;
    }
}
