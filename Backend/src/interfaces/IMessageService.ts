import { IMail } from "../Models/Mail.Model";

export interface IMessageService {
    getMessages(): Promise<IMail[]>;
    deleteMessage(id: string): Promise<boolean>;
}
