import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IMailService } from "../interfaces/IMailService";
import { IMailRepository } from "../interfaces/IMailRepository";
import { IMailSender } from "../interfaces/IMailSender";
import { addMailJob } from "../Utils/mailQueue";

@injectable()
export class MailService implements IMailService {
    constructor(
        @inject(TYPES.IMailRepository) private mailRepository: IMailRepository,
        @inject(TYPES.IMailSender) private mailSender: IMailSender
    ) {}

    public async processIncomingMail(email: string, name: string, message: string): Promise<void> {
        // Try queueing first
        const queued = await addMailJob(email, name, message);
        if (queued) {
            console.log("Email job successfully added to BullMQ.");
            return;
        }

        // Fallback to synchronous sending if Redis is down
        console.warn("Queue unavailable. Falling back to synchronous email sending.");
        await this.mailSender.sendMail(email, "you have an email from " + email, "message: " + message);
        await this.mailRepository.createMail(email, name, message);
    }
}
