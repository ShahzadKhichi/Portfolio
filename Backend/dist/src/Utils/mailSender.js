"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailSenderUtility = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
const mailTemplate_1 = require("./mailTemplate");
dotenv_1.default.config();
let MailSenderUtility = class MailSenderUtility {
    async sendMail(email, title, body, templateType = "default", senderName) {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            });
            let htmlBody = body;
            if (templateType === "message") {
                htmlBody = (0, mailTemplate_1.buildContactMessageTemplate)(email, senderName || "Portfolio Contact", body);
            }
            else if (templateType === "otp") {
                const otp = body.match(/\b\d{6}\b/)?.[0] || "000000";
                htmlBody = (0, mailTemplate_1.buildOtpTemplate)(email, otp, 10);
            }
            else if (!body.includes("<")) {
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
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
};
exports.MailSenderUtility = MailSenderUtility;
exports.MailSenderUtility = MailSenderUtility = __decorate([
    (0, tsyringe_1.injectable)()
], MailSenderUtility);
