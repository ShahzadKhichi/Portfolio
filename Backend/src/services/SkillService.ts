import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { ISkill } from "../Models/Skill.Model";
import { ISkillRepository } from "../interfaces/ISkillRepository";
import { ISkillService } from "../interfaces/ISkillService";

@injectable()
export class SkillService implements ISkillService {
    constructor(
        @inject(TYPES.ISkillRepository) private skillRepository: ISkillRepository
    ) {}

    public async getAllSkills(): Promise<ISkill[]> {
        return await this.skillRepository.getAllSkills();
    }

    public async getSkillById(id: string): Promise<ISkill | null> {
        return await this.skillRepository.getSkillById(id);
    }

    public async createSkill(data: Partial<ISkill>): Promise<ISkill> {
        return await this.skillRepository.createSkill(data);
    }

    public async updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
        return await this.skillRepository.updateSkill(id, data);
    }

    public async deleteSkill(id: string): Promise<ISkill | null> {
        return await this.skillRepository.deleteSkill(id);
    }
}
