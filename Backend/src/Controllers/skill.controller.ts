import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { ISkillService } from "../interfaces/ISkillService";

import { uploadToCloudinary, deleteFromCloudinary } from "../Utils/cloudinary";

@injectable()
export class SkillController {
  constructor(
    @inject(TYPES.ISkillService) private skillService: ISkillService
  ) {}

  public getAllSkills = async (req: Request, res: Response): Promise<void> => {
    try {
      const skills = await this.skillService.getAllSkills();
      res.status(200).json({ success: true, skills });
    } catch (error) {
      console.error("Get Skills Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public createSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      let iconUrl = req.body.icon;
      let iconPublicId = "";

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          iconUrl = result.url;
          iconPublicId = result.public_id;
        }
      }

      const skillData = {
        ...req.body,
        icon: iconUrl,
        iconPublicId: iconPublicId,
      };

      const skill = await this.skillService.createSkill(skillData);
      res.status(201).json({ success: true, skill });
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

      let iconUrl = req.body.icon;
      let iconPublicId = existingSkill.iconPublicId;

      if (req.file) {
        // Delete old icon
        if (existingSkill.iconPublicId) {
          await deleteFromCloudinary(existingSkill.iconPublicId);
        }
        
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          iconUrl = result.url;
          iconPublicId = result.public_id;
        }
      }

      const skillData = {
        ...req.body,
        icon: iconUrl,
        iconPublicId: iconPublicId,
      };

      const updatedSkill = await this.skillService.updateSkill(id, skillData);
      res.status(200).json({ success: true, skill: updatedSkill });
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

      if (skill.iconPublicId) {
        await deleteFromCloudinary(skill.iconPublicId);
      }

      await this.skillService.deleteSkill(id);
      res.status(200).json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      console.error("Delete Skill Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
