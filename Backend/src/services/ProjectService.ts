import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProject } from "../Models/Project.Model";
import { IProjectRepository } from "../interfaces/IProjectRepository";
import { IProjectService } from "../interfaces/IProjectService";

@injectable()
export class ProjectService implements IProjectService {
    constructor(
        @inject(TYPES.IProjectRepository) private projectRepository: IProjectRepository
    ) {}

    public async createProject(data: Partial<IProject>): Promise<IProject> {
        return await this.projectRepository.createProject(data);
    }

    public async getAllProjects(): Promise<IProject[]> {
        return await this.projectRepository.getAllProjects();
    }

    public async getProjectById(id: string): Promise<IProject | null> {
        return await this.projectRepository.getProjectById(id);
    }

    public async updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
        return await this.projectRepository.updateProject(id, data);
    }

    public async deleteProject(id: string): Promise<IProject | null> {
        return await this.projectRepository.deleteProject(id);
    }
}
