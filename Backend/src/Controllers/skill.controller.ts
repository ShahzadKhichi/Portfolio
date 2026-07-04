import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { ISkillService } from "../interfaces/ISkillService";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from "../Utils/cloudinary";
import { SkillDTO } from "../DTOs/Skill.dto";
import { getCache, setCache, deleteCache, DEFAULT_CACHE_TTL_SECONDS } from "../Utils/cache";

@injectable()
export class SkillController {
  constructor(
    @inject(TYPES.ISkillService) private skillService: ISkillService
  ) {}

  public getAllSkills = async (req: Request, res: Response): Promise<void> => {
    try {
      const cacheKey = "portfolio:skills";
      const cachedSkills = await getCache<any[]>(cacheKey);
      if (cachedSkills) {
        res.status(200).json({ success: true, skills: cachedSkills });
        return;
      }

      const skills = await this.skillService.getAllSkills();
      const responseList = SkillDTO.toResponseList(skills);
      
      await setCache(cacheKey, responseList);

      res.status(200).json({ success: true, skills: responseList });
    } catch (error) {
      console.error("Get Skills Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public createSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      let imageData = {
        secureUrl: "",
        publicId: ""
      };
      
      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          imageData.secureUrl = result.url;
          imageData.publicId = result.public_id;
        }
      } else if (req.body.icon) {
        imageData.secureUrl = req.body.icon;
        imageData.publicId = extractPublicId(req.body.icon);
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
      const skillId = String((skill as any)._id ?? (skill as any).id ?? "");

      await deleteCache(["portfolio:skills", `portfolio:skill:${skillId}`]);
      const freshSkills = await this.skillService.getAllSkills();
      await setCache("portfolio:skills", SkillDTO.toResponseList(freshSkills), DEFAULT_CACHE_TTL_SECONDS);
      if (skillId) {
        await setCache(`portfolio:skill:${skillId}`, SkillDTO.toResponse(skill), DEFAULT_CACHE_TTL_SECONDS);
      }

      res.status(201).json({ success: true, skill: SkillDTO.toResponse(skill) });
    } catch (error) {
      console.error("Create Skill Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public updateSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const existingSkill = await this.skillService.getSkillById(id);
      
      if (!existingSkill) {
        res.status(404).json({ success: false, message: "Skill not found" });
        return;
      }

      let imageData = { ...existingSkill.image };

      if (req.file) {
        // Delete old icon
        if (existingSkill.image.publicId) {
          await deleteFromCloudinary(existingSkill.image.publicId);
        }
        
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          imageData.secureUrl = result.url;
          imageData.publicId = result.public_id;
        }
      } else if (req.body.icon && req.body.icon !== existingSkill.image.secureUrl) {
        imageData.secureUrl = req.body.icon;
        imageData.publicId = extractPublicId(req.body.icon);
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

      await deleteCache(["portfolio:skills", `portfolio:skill:${id}`]);
      const freshSkills = await this.skillService.getAllSkills();
      await setCache("portfolio:skills", SkillDTO.toResponseList(freshSkills), DEFAULT_CACHE_TTL_SECONDS);
      await setCache(`portfolio:skill:${id}`, SkillDTO.toResponse(updatedSkill), DEFAULT_CACHE_TTL_SECONDS);

      res.status(200).json({ success: true, skill: SkillDTO.toResponse(updatedSkill) });
    } catch (error) {
      console.error("Update Skill Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public deleteSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const skill = await this.skillService.getSkillById(id);
      
      if (!skill) {
        res.status(404).json({ success: false, message: "Skill not found" });
        return;
      }

      if (skill.image.publicId) {
        await deleteFromCloudinary(skill.image.publicId);
      }

      await this.skillService.deleteSkill(id);

      await deleteCache(["portfolio:skills", `portfolio:skill:${id}`]);
      const freshSkills = await this.skillService.getAllSkills();
      await setCache("portfolio:skills", SkillDTO.toResponseList(freshSkills), DEFAULT_CACHE_TTL_SECONDS);

      res.status(200).json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      console.error("Delete Skill Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
