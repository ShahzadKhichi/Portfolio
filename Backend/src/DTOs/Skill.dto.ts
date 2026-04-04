import { ISkill } from "../Models/Skill.Model";

export interface SkillResponseDTO {
    _id: string;
    name: string;
    level: number;
    category: string;
    icon: string;
}

export class SkillDTO {
    public static toResponse(skill: ISkill): SkillResponseDTO {
        return {
            _id: skill._id as string,
            name: skill.name,
            level: skill.level,
            category: skill.category,
            icon: skill.image.secureUrl,
        };
    }

    public static toResponseList(skills: ISkill[]): SkillResponseDTO[] {
        return skills.map(skill => this.toResponse(skill));
    }
}
