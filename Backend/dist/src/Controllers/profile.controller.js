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
exports.ProfileController = void 0;
const tsyringe_1 = require("tsyringe");
const types_1 = require("../interfaces/types");
const cloudinary_1 = require("../Utils/cloudinary");
const Profile_dto_1 = require("../DTOs/Profile.dto");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
        this.getProfile = async (req, res) => {
            try {
                const profile = await this.profileService.getProfile();
                if (!profile) {
                    res.status(404).json({ success: false, message: "Profile not found" });
                    return;
                }
                res.status(200).json({ success: true, profile: Profile_dto_1.ProfileDTO.toResponse(profile) });
            }
            catch (error) {
                console.error("Get Profile Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.updateProfile = async (req, res) => {
            try {
                const existingProfile = await this.profileService.getProfile();
                let imageData = { ...existingProfile?.image };
                if (req.file) {
                    // Delete old image
                    if (existingProfile?.image.publicId) {
                        await (0, cloudinary_1.deleteFromCloudinary)(existingProfile.image.publicId);
                    }
                    const result = await (0, cloudinary_1.uploadToCloudinary)(req.file.buffer, req.file.mimetype);
                    if (result) {
                        imageData.secureUrl = result.url;
                        imageData.publicId = result.public_id;
                    }
                }
                else if (req.body.profileImage && req.body.profileImage !== existingProfile?.image.secureUrl) {
                    imageData.secureUrl = req.body.profileImage;
                    imageData.publicId = (0, cloudinary_1.extractPublicId)(req.body.profileImage);
                }
                const profileData = { ...req.body, image: imageData };
                delete profileData.profileImage;
                delete profileData.profileImagePublicId;
                if (profileData.socialLinks && typeof profileData.socialLinks === "string") {
                    profileData.socialLinks = JSON.parse(profileData.socialLinks);
                }
                const updatedProfile = await this.profileService.updateProfile(profileData);
                if (!updatedProfile) {
                    res.status(404).json({ success: false, message: "Profile not found" });
                    return;
                }
                res.status(200).json({ success: true, profile: Profile_dto_1.ProfileDTO.toResponse(updatedProfile) });
            }
            catch (error) {
                console.error("Update Profile Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
        this.incrementViews = async (req, res) => {
            try {
                await this.profileService.incrementViews();
                res.status(200).json({ success: true, message: "Views incremented" });
            }
            catch (error) {
                console.error("Increment Views Error:", error);
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        };
    }
};
exports.ProfileController = ProfileController;
exports.ProfileController = ProfileController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(types_1.TYPES.IProfileService)),
    __metadata("design:paramtypes", [Object])
], ProfileController);
