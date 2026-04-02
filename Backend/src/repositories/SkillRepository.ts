import { injectable } from "tsyringe";
import Skill, { ISkill } from "../Models/Skill.Model";
import { ISkillRepository } from "../interfaces/ISkillRepository";

@injectable()
export class SkillRepository implements ISkillRepository {
    public async getAllSkills(): Promise<ISkill[]> {
        return await Skill.find().sort({ name: 1 });
    }

    public async createSkill(data: Partial<ISkill>): Promise<ISkill> {
        return await Skill.create(data);
    }

    public async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
        return await Skill.findByIdAndUpdate(id, data, { new: true });
    }

    public async deleteSkill(id: string): Promise<ISkill | null> {
        return await Skill.findByIdAndDelete(id);
    }
}
