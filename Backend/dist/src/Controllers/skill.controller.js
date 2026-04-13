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
exports.SkillController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
const cloudinary_1 = require("../Utils/cloudinary");
const Skill_dto_1 = require("../DTOs/Skill.dto");
let SkillController = class SkillController {
    constructor(skillService) {
        this.skillService = skillService;
        this.getAllSkills = async (req, res) => {
            try {
                const skills = await this.skillService.getAllSkills();
                res.status(200).json({ success: true, skills: Skill_dto_1.SkillDTO.toResponseList(skills) });
            }
            catch (error) {
                console.error("Get Skills Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.createSkill = async (req, res) => {
            try {
                let imageData = {
                    secureUrl: "",
                    publicId: ""
                };
                if (req.file) {
                    const result = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, req.file.mimetype);
                    if (result) {
                        imageData.secureUrl = result.url;
                        imageData.publicId = result.public_id;
                    }
                }
                else if (req.body.icon) {
                    imageData.secureUrl = req.body.icon;
                    imageData.publicId = (0, cloudinary_1.extractPublicId)(req.body.icon);
                }
                if (!imageData.secureUrl) {
                    res.status(400).json({ success: false, message: "Icon is required" });
                    return;
                }
                const skillData = {
                    ...req.body,
                    image: imageData,
                };
                // Remove legacy fields if they exist in req.body
                delete skillData.icon;
                delete skillData.iconPublicId;
                const skill = await this.skillService.createSkill(skillData);
                res.status(201).json({ success: true, skill: Skill_dto_1.SkillDTO.toResponse(skill) });
            }
            catch (error) {
                console.error("Create Skill Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.updateSkill = async (req, res) => {
            try {
                const id = req.params.id;
                const existingSkill = await this.skillService.getSkillById(id);
                if (!existingSkill) {
                    res.status(404).json({ success: false, message: "Skill not found" });
                    return;
                }
                let imageData = { ...existingSkill.image };
                if (req.file) {
                    // Delete old icon
                    if (existingSkill.image.publicId) {
                        await (0, cloudinary_1.deleteFromCloudinary)(existingSkill.image.publicId);
                    }
                    const result = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, req.file.mimetype);
                    if (result) {
                        imageData.secureUrl = result.url;
                        imageData.publicId = result.public_id;
                    }
                }
                else if (req.body.icon && req.body.icon !== existingSkill.image.secureUrl) {
                    imageData.secureUrl = req.body.icon;
                    imageData.publicId = (0, cloudinary_1.extractPublicId)(req.body.icon);
                }
                const skillData = {
                    ...req.body,
                    image: imageData,
                };
                delete skillData.icon;
                delete skillData.iconPublicId;
                const updatedSkill = await this.skillService.updateSkill(id, skillData);
                if (!updatedSkill) {
                    res.status(404).json({ success: false, message: "Skill not found" });
                    return;
                }
                res.status(200).json({ success: true, skill: Skill_dto_1.SkillDTO.toResponse(updatedSkill) });
            }
            catch (error) {
                console.error("Update Skill Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.deleteSkill = async (req, res) => {
            try {
                const id = req.params.id;
                const skill = await this.skillService.getSkillById(id);
                if (!skill) {
                    res.status(404).json({ success: false, message: "Skill not found" });
                    return;
                }
                if (skill.image.publicId) {
                    await (0, cloudinary_1.deleteFromCloudinary)(skill.image.publicId);
                }
                await this.skillService.deleteSkill(id);
                res.status(200).json({ success: true, message: "Skill deleted successfully" });
            }
            catch (error) {
                console.error("Delete Skill Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
    }
};
exports.SkillController = SkillController;
exports.SkillController = SkillController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.ISkillService)),
    __metadata("design:paramtypes", [Object])
], SkillController);
