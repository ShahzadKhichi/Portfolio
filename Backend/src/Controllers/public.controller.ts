import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IMailService } from "../interfaces/IMailService";

@injectable()
export class PublicController {
  constructor(
      @inject(TYPES.IMailService) private mailService: IMailService
  ) {}

  public sendMail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, name, message } = req.body as {
        email: string;
        name: string;
        message: string;
      };

      if (!email || !name || !message) {
        res.status(401).json({
          message: "All fields are required",
          success: false,
        });
        return;
      }

      await this.mailService.processIncomingMail(email, name, message);

      res.status(200).json({
        message: "mail sent",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
        success: false,
      });
    }
  };
}
