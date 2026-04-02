import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { ISkillService } from "../interfaces/ISkillService";

import { uploadToCloudinary } from "../Utils/cloudinary";

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

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          iconUrl = result;
        }
      }

      const skillData = {
        ...req.body,
        icon: iconUrl,
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
      let iconUrl = req.body.icon;

      if (req.file) {
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          iconUrl = result;
        }
      }

      const skillData = {
        ...req.body,
        icon: iconUrl,
      };

      const updatedSkill = await this.skillService.updateSkill(id, skillData);
      if (!updatedSkill) {
        res.status(404).json({ success: false, message: "Skill not found" });
        return;
      }
      res.status(200).json({ success: true, skill: updatedSkill });
    } catch (error) {
      console.error("Update Skill Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  public deleteSkill = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await this.skillService.deleteSkill(req.params.id as string);
      if (!deleted) {
        res.status(404).json({ success: false, message: "Skill not found" });
        return;
      }
      res.status(200).json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      console.error("Delete Skill Error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
}
