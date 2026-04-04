import { IProject } from "../Models/Project.Model";

export interface ProjectResponseDTO {
    _id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    github?: string;
    live?: string;
}

export class ProjectDTO {
    public static toResponse(project: IProject): ProjectResponseDTO {
       
        return {
            _id: project._id as string,
            title: project.title,
            description: project.description,
            image: project.image.secureUrl,
            tags: project.tags || [],
            github: project.github,
            live: project.live,
        };
    }

    public static toResponseList(projects: IProject[]): ProjectResponseDTO[] {
        return projects.map(project => this.toResponse(project));
    }
}
