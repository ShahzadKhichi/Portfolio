"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDTO = void 0;
class ProjectDTO {
    static toResponse(project) {
        return {
            _id: project._id,
            title: project.title,
            description: project.description,
            image: project.image.secureUrl,
            tags: project.tags || [],
            github: project.github,
            live: project.live,
        };
    }
    static toResponseList(projects) {
        return projects.map(project => this.toResponse(project));
    }
}
exports.ProjectDTO = ProjectDTO;
