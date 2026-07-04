import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { injectable } from "tsyringe";
import { IMailSender } from "../interfaces/IMailSender";
import { buildContactMessageTemplate, buildOtpTemplate } from "./mailTemplate";

dotenv.config();

@injectable()
export class MailSenderUtility implements IMailSender {
  public async sendMail(email: string, title: string, body: string, templateType: "message" | "otp" | "default" = "default", senderName?: string): Promise<any> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      let htmlBody = body;
      if (templateType === "message") {
        htmlBody = buildContactMessageTemplate(email, senderName || "Portfolio Contact", body);
      } else if (templateType === "otp") {
        const otp = body.match(/\b\d{6}\b/)?.[0] || "000000";
        htmlBody = buildOtpTemplate(email, otp, 10);
      } else if (!body.includes("<")) {
        htmlBody = `<div style="font-family:Inter,Segoe UI,Arial,sans-serif;color:#0f172a;line-height:1.7;padding:20px;">${body}</div>`;
      }

      const info = await transporter.sendMail({
        from: process.env.MAIL_USER || "shahzadkhichi996@gmail.com",
        to: process.env.MAIL_USER || "shahzadkhichi996@gmail.com",
        replyTo: email,
        subject: title,
        html: htmlBody,
        text: body.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      });

      return info;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

