import { IProject } from "../Models/Project.Model";

export interface IProjectRepository {
    createProject(data: Partial<IProject>): Promise<IProject>;
    getAllProjects(): Promise<IProject[]>;
    getProjectById(id: string): Promise<IProject | null>;
    updateProject(id: string, data: Partial<IProject>): Promise<IProject | null>;
    deleteProject(id: string): Promise<IProject | null>;
}
