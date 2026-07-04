import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProjectService } from "../interfaces/IProjectService";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicId } from "../Utils/cloudinary";
import { ProjectDTO } from "../DTOs/Project.dto";
import { getCache, setCache, deleteCache } from "../Utils/cache";

@injectable()
export class ProjectController {
  constructor(
      @inject(TYPES.IProjectService) private projectService: IProjectService
  ) {}

  public createProject = async (req: Request, res: Response): Promise<void> => {
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
      } else if (req.body.image) {
        imageData.secureUrl = req.body.image;
        imageData.publicId = extractPublicId(req.body.image);
      }

      if (!imageData.secureUrl) {
        res.status(400).json({ success: false, message: "Image is required" });
        return;
      }

      const projectData = { ...req.body, image: imageData };
      
      delete projectData.imagePublicId;

      const project = await this.projectService.createProject(projectData);

      // Invalidate projects cache
      await deleteCache("portfolio:projects");

      res.status(201).json({ success: true, project: ProjectDTO.toResponse(project) });
    } catch (error) {
      console.error("Create Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public getAllProjects = async (req: Request, res: Response): Promise<void> => {
    try {
      const cacheKey = "portfolio:projects";
      const cachedProjects = await getCache<any[]>(cacheKey);
      if (cachedProjects) {
        res.status(200).json({ success: true, projects: cachedProjects });
        return;
      }

      const projects = await this.projectService.getAllProjects();
      const responseList = ProjectDTO.toResponseList(projects);
      
      await setCache(cacheKey, responseList, 3600); // cache for 1 hour

      res.status(200).json({ success: true, projects: responseList });
    } catch (error) {
      console.error("Get Projects Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const cacheKey = `portfolio:project:${id}`;
      const cachedProject = await getCache<any>(cacheKey);
      if (cachedProject) {
        res.status(200).json({ success: true, project: cachedProject });
        return;
      }

      const project = await this.projectService.getProjectById(id);
      if (!project) {
        res.status(404).json({ message: "Project not found", success: false });
        return;
      }

      const responseData = ProjectDTO.toResponse(project);
      await setCache(cacheKey, responseData, 3600);

      res.status(200).json({ success: true, project: responseData });
    } catch (error) {
      console.error("Get Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const existingProject = await this.projectService.getProjectById(id);
      
      if (!existingProject) {
        res.status(404).json({ message: "Project not found", success: false });
        return;
      }

      let imageData = { ...existingProject.image };

      if (req.file) {
        // If there's an existing image, delete it
        if (existingProject.image.publicId) {
          await deleteFromCloudinary(existingProject.image.publicId);
        }
        
        const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
        if (result) {
          imageData.secureUrl = result.url;
          imageData.publicId = result.public_id;
        }
      } else if (req.body.image && req.body.image !== existingProject.image.secureUrl) {
        imageData.secureUrl = req.body.image;
        imageData.publicId = extractPublicId(req.body.image);
      }

      const projectData = { ...req.body, image: imageData };
      delete projectData.imagePublicId;

      const project = await this.projectService.updateProject(id, projectData);
      if (!project) {
        res.status(404).json({ success: false, message: "Project not found" });
        return;
      }

      // Invalidate projects cache
      await deleteCache(["portfolio:projects", `portfolio:project:${id}`]);

      res.status(200).json({ success: true, project: ProjectDTO.toResponse(project) });
    } catch (error) {
      console.error("Update Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id as string;
      const project = await this.projectService.getProjectById(id);
      
      if (!project) {
        res.status(404).json({ message: "Project not found", success: false });
        return;
      }

      // Delete from Cloudinary if public_id exists
      if (project.image.publicId) {
        await deleteFromCloudinary(project.image.publicId);
      }

      await this.projectService.deleteProject(id);

      // Invalidate projects cache
      await deleteCache(["portfolio:projects", `portfolio:project:${id}`]);

      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      console.error("Delete Project Error:", error);
      res.status(500).json({ message: "internal server error", success: false });
    }
  };
}
