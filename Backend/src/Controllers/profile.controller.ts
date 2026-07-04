import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProfileService } from "../interfaces/IProfileService";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from "../Utils/cloudinary";
import { ProfileDTO } from "../DTOs/Profile.dto";
import { getCache, setCache, deleteCache, DEFAULT_CACHE_TTL_SECONDS } from "../Utils/cache";

@injectable()
export class ProfileController {
  constructor(
    @inject(TYPES.IProfileService) private profileService: IProfileService
  ) {}

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const cacheKey = "portfolio:profile";
      const cachedProfile = await getCache<any>(cacheKey);
      if (cachedProfile) {
        res.status(200).json({ success: true, profile: cachedProfile });
        return;
      }

      const profile = await this.profileService.getProfile();
      if (!profile) {
        res.status(404).json({ success: false, message: "Profile not found" });
        return;
      }

      const responseData = ProfileDTO.toResponse(profile);
      await setCache(cacheKey, responseData);

      res.status(200).json({ success: true, profile: responseData });
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

      await deleteCache("portfolio:profile");
      await setCache("portfolio:profile", ProfileDTO.toResponse(updatedProfile), DEFAULT_CACHE_TTL_SECONDS);

      res.status(200).json({ success: true, profile: ProfileDTO.toResponse(updatedProfile) });
    } catch (error) {
      console.error("Update Profile Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public incrementViews = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.profileService.incrementViews();
      
      await deleteCache("portfolio:profile");
      const refreshedProfile = await this.profileService.getProfile();
      if (refreshedProfile) {
        await setCache("portfolio:profile", ProfileDTO.toResponse(refreshedProfile), DEFAULT_CACHE_TTL_SECONDS);
      }

      res.status(200).json({ success: true, message: "Views incremented" });
    } catch (error) {
      console.error("Increment Views Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
