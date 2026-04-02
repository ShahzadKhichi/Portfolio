import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProjectService } from "../interfaces/IProjectService";
import { uploadToCloudinary } from "../Utils/cloudinary";

@injectable()
export class ProjectController {
  constructor(
      @inject(TYPES.IProjectService) private projectService: IProjectService
  ) {}

  public createProject = async (req: Request, res: Response): Promise<void> => {
    try {
      let imageUrl = "";
      if (req.file) {
        const uploadedUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (uploadedUrl) imageUrl = uploadedUrl;
      } else if (req.body.image) {
        imageUrl = req.body.image;
      }

      const projectData = { ...req.body, image: imageUrl };
      
      const project = await this.projectService.createProject(projectData);
      res.status(201).json({ success: true, project });
    } catch (error) {
      console.error("Create Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public getAllProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json({ success: true, projects });
    } catch (error) {
      console.error("Get Projects Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const project = await this.projectService.getProjectById(id);
      if (!project) {
        res.status(404).json({ message: "Project not found", success: false });
        return;
      }
      res.status(200).json({ success: true, project });
    } catch (error) {
      console.error("Get Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      
      let updateData = { ...req.body };
      if (req.file) {
        const uploadedUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (uploadedUrl) updateData.image = uploadedUrl;
      }

      const project = await this.projectService.updateProject(id, updateData);
      if (!project) {
        res.status(404).json({ message: "Project not found", success: false });
        return;
      }
      res.status(200).json({ success: true, project });
    } catch (error) {
      console.error("Update Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const project = await this.projectService.deleteProject(id);
      if (!project) {
        res.status(404).json({ message: "Project not found", success: false });
        return;
      }
      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      console.error("Delete Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };
}
