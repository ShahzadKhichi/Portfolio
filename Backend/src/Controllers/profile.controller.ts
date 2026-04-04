import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProfileService } from "../interfaces/IProfileService";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from "../Utils/cloudinary";
import { ProfileDTO } from "../DTOs/Profile.dto";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.IProfileService) private profileService: IProfileService
  ) {}

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const profile = await this.profileService.getProfile();
      if (!profile) {
        res.status(404).json({ success: false, message: "Profile not found" });
        return;
      }
      res.status(200).json({ success: true, profile: ProfileDTO.toResponse(profile) });
    } catch (error) {
      console.error("Get Profile Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const existingProfile = await this.profileService.getProfile();
      let imageData = { ...existingProfile?.image };

      if (req.file) {
        // Delete old image
        if (existingProfile?.image.publicId) {
          await deleteFromCloudinary(existingProfile.image.publicId);
        }

        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          imageData.secureUrl = result.url;
          imageData.publicId = result.public_id;
        }
      } else if (req.body.profileImage && req.body.profileImage !== existingProfile?.image.secureUrl) {
        imageData.secureUrl = req.body.profileImage;
        imageData.publicId = extractPublicId(req.body.profileImage);
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
      res.status(200).json({ success: true, profile: ProfileDTO.toResponse(updatedProfile) });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
