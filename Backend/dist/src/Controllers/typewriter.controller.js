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
exports.TypewriterController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
const Typewriter_dto_1 = require("../DTOs/Typewriter.dto");
const cache_1 = require("../Utils/cache");
let TypewriterController = class TypewriterController {
    constructor(typewriterService) {
        this.typewriterService = typewriterService;
        this.getAllTypewriters = async (req, res) => {
            try {
                const cacheKey = "portfolio:typewriters";
                const cachedTypewriters = await (0, cache_1.getCache)(cacheKey);
                if (cachedTypewriters) {
                    res.status(200).json({ success: true, typewriters: cachedTypewriters });
                    return;
                }
                const typewriters = await this.typewriterService.getAllTypewriters();
                const responseList = Typewriter_dto_1.TypewriterDTO.toResponseList(typewriters);
                await (0, cache_1.setCache)(cacheKey, responseList);
                res.status(200).json({ success: true, typewriters: responseList });
            }
            catch (error) {
                console.error("Get Typewriters Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.createTypewriter = async (req, res) => {
            try {
                const typewriter = await this.typewriterService.createTypewriter(req.body);
                const typewriterId = String(typewriter._id ?? typewriter.id ?? "");
                await (0, cache_1.deleteCache)(["portfolio:typewriters", `portfolio:typewriter:${typewriterId}`]);
                const freshTypewriters = await this.typewriterService.getAllTypewriters();
                await (0, cache_1.setCache)("portfolio:typewriters", Typewriter_dto_1.TypewriterDTO.toResponseList(freshTypewriters), cache_1.DEFAULT_CACHE_TTL_SECONDS);
                if (typewriterId) {
                    await (0, cache_1.setCache)(`portfolio:typewriter:${typewriterId}`, Typewriter_dto_1.TypewriterDTO.toResponse(typewriter), cache_1.DEFAULT_CACHE_TTL_SECONDS);
                }
                res.status(201).json({ success: true, typewriter: Typewriter_dto_1.TypewriterDTO.toResponse(typewriter) });
            }
            catch (error) {
                console.error("Create Typewriter Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.updateTypewriter = async (req, res) => {
            try {
                const id = req.params.id;
                const updatedTypewriter = await this.typewriterService.updateTypewriter(id, req.body);
                if (!updatedTypewriter) {
                    res.status(404).json({ success: false, message: "Typewriter text not found" });
                    return;
                }
                await (0, cache_1.deleteCache)(["portfolio:typewriters", `portfolio:typewriter:${id}`]);
                const freshTypewriters = await this.typewriterService.getAllTypewriters();
                await (0, cache_1.setCache)("portfolio:typewriters", Typewriter_dto_1.TypewriterDTO.toResponseList(freshTypewriters), cache_1.DEFAULT_CACHE_TTL_SECONDS);
                await (0, cache_1.setCache)(`portfolio:typewriter:${id}`, Typewriter_dto_1.TypewriterDTO.toResponse(updatedTypewriter), cache_1.DEFAULT_CACHE_TTL_SECONDS);
                res.status(200).json({ success: true, typewriter: Typewriter_dto_1.TypewriterDTO.toResponse(updatedTypewriter) });
            }
            catch (error) {
                console.error("Update Typewriter Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.deleteTypewriter = async (req, res) => {
            try {
                const id = req.params.id;
                const deletedTypewriter = await this.typewriterService.deleteTypewriter(id);
                if (!deletedTypewriter) {
                    res.status(404).json({ success: false, message: "Typewriter text not found" });
                    return;
                }
                await (0, cache_1.deleteCache)(["portfolio:typewriters", `portfolio:typewriter:${id}`]);
                const freshTypewriters = await this.typewriterService.getAllTypewriters();
                await (0, cache_1.setCache)("portfolio:typewriters", Typewriter_dto_1.TypewriterDTO.toResponseList(freshTypewriters), cache_1.DEFAULT_CACHE_TTL_SECONDS);
                res.status(200).json({ success: true, message: "Typewriter text deleted successfully" });
            }
            catch (error) {
                console.error("Delete Typewriter Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
    }
};
exports.TypewriterController = TypewriterController;
exports.TypewriterController = TypewriterController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.ITypewriterService)),
    __metadata("design:paramtypes", [Object])
], TypewriterController);
