import { injectable } from "tsyringe";
import Project, { IProject } from "../Models/Project.Model";
import { IProjectRepository } from "../interfaces/IProjectRepository";

@injectable()
export class ProjectRepository implements IProjectRepository {
    public async createProject(data: Partial<IProject>): Promise<IProject> {
        return await Project.create(data);
    }

    public async getAllProjects(): Promise<IProject[]> {
        return await Project.find().sort({ createdAt: -1 });
    }

    public async getProjectById(id: string): Promise<IProject | null> {
        return await Project.findById(id);
    }

    public async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
        return await Project.findByIdAndUpdate(id, data, { new: true });
    }

    public async deleteProject(id: string): Promise<IProject | null> {
        return await Project.findByIdAndDelete(id);
    }
}
