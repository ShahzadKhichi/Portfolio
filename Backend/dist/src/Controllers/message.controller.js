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
exports.MessageController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
        this.getMessages = async (req, res) => {
            try {
                const messages = await this.messageService.getMessages();
                res.status(200).json({ success: true, messages });
            }
            catch (error) {
                console.error("Get Messages Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.deleteMessage = async (req, res) => {
            try {
                const success = await this.messageService.deleteMessage(req.params.id);
                if (!success) {
                    res.status(404).json({ success: false, message: "Message not found" });
                    return;
                }
                res.status(200).json({ success: true, message: "Message deleted successfully" });
            }
            catch (error) {
                console.error("Delete Message Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
    }
};
exports.MessageController = MessageController;
exports.MessageController = MessageController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.IMessageService)),
    __metadata("design:paramtypes", [Object])
], MessageController);
