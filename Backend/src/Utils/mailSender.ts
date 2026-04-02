import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { injectable } from "tsyringe";
import { IMailSender } from "../interfaces/IMailSender";

dotenv.config();

@injectable()
export class MailSenderUtility implements IMailSender {
  public async sendMail(email: string, title: string, body: string): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: email,
        to: "shahzadkhichi996@gmail.com",
        subject: title,
        html: body,
      });

      return info;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

