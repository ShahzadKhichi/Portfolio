"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
let PublicController = class PublicController {
    constructor(mailService) {
        this.mailService = mailService;
        this.sendMail = async (req, res) => {
            try {
                const { email, name, message } = req.body;
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
            }
            catch (error) {
                res.status(500).json({
                    message: "internal server error",
                    success: false,
                });
            }
        };
    }
};
exports.PublicController = PublicController;
exports.PublicController = PublicController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.IMailService)),
    __metadata("design:paramtypes", [Object])
], PublicController);
