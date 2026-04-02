import { ISkill } from "../Models/Skill.Model";

export interface ISkillRepository {
    getAllSkills(): Promise<ISkill[]>;
    createSkill(data: Partial<ISkill>): Promise<ISkill>;
    updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null>;
    deleteSkill(id: string): Promise<ISkill | null>;
}
