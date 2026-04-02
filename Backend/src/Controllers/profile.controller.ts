import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProfileService } from "../interfaces/IProfileService";
import { uploadToCloudinary } from "../Utils/cloudinary";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.IProfileService) private profileService: IProfileService
  ) {}

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const profile = await this.profileService.getProfile();
      res.status(200).json({ success: true, profile });
    } catch (error) {
      console.error("Get Profile Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      let updateData = { ...req.body };

      if (req.file) {
        const uploadedUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (uploadedUrl) {
            updateData.profileImage = uploadedUrl;
        }
      }

      if (updateData.socialLinks && typeof updateData.socialLinks === "string") {
        updateData.socialLinks = JSON.parse(updateData.socialLinks);
      }

      const updatedProfile = await this.profileService.updateProfile(updateData);
      res.status(200).json({ success: true, profile: updatedProfile });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
