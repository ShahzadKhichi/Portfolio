import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IMessageService } from "../interfaces/IMessageService";

@injectable()
export class MessageController {
  constructor(
    @inject(TYPES.IMessageService) private messageService: IMessageService
  ) {}

  public getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const messages = await this.messageService.getMessages();
      res.status(200).json({ success: true, messages });
    } catch (error) {
      console.error("Get Messages Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public deleteMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const success = await this.messageService.deleteMessage(req.params.id as string);
      if (!success) {
        res.status(404).json({ success: false, message: "Message not found" });
        return;
      }
      res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
      console.error("Delete Message Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
