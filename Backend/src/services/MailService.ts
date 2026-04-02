import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IMailService } from "../interfaces/IMailService";
import { IMailRepository } from "../interfaces/IMailRepository";
import { IMailSender } from "../interfaces/IMailSender";

@injectable()
export class MailService implements IMailService {
    constructor(
        @inject(TYPES.IMailRepository) private mailRepository: IMailRepository,
        @inject(TYPES.IMailSender) private mailSender: IMailSender
    ) {}

    public async processIncomingMail(email: string, name: string, message: string): Promise<void> {
        await this.mailSender.sendMail(email, "you have an email from " + email, "message: " + message);
        await this.mailRepository.createMail(email, name, message);
    }
}
