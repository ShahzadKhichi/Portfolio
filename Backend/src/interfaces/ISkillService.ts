import { ISkill } from "../Models/Skill.Model";

export interface ISkillService {
    getAllSkills(): Promise<ISkill[]>;
    getSkillById(id: string): Promise<ISkill | null>;
    createSkill(data: Partial<ISkill>): Promise<ISkill>;
    updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null>;
    deleteSkill(id: string): Promise<ISkill | null>;
}
