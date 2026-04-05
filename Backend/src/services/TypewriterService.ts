import { injectable, inject } from "tsyringe";
import { ITypewriterService } from "../interfaces/ITypewriterService";
import { ITypewriterRepository } from "../interfaces/ITypewriterRepository";
import { TYPES } from "../interfaces/types";
import { ITypewriter } from "../Models/Typewriter.Model";

@injectable()
export class TypewriterService implements ITypewriterService {
    constructor(
        @inject(TYPES.ITypewriterRepository) private typewriterRepository: ITypewriterRepository
    ) {}

    public async getAllTypewriters(): Promise<ITypewriter[]> {
        return await this.typewriterRepository.getAllTypewriters();
    }

    public async getTypewriterById(id: string): Promise<ITypewriter | null> {
        return await this.typewriterRepository.getTypewriterById(id);
    }

    public async createTypewriter(data: Partial<ITypewriter>): Promise<ITypewriter> {
        return await this.typewriterRepository.createTypewriter(data);
    }

    public async updateTypewriter(id: string, data: Partial<ITypewriter>): Promise<ITypewriter | null> {
        return await this.typewriterRepository.updateTypewriter(id, data);
    }

    public async deleteTypewriter(id: string): Promise<ITypewriter | null> {
        return await this.typewriterRepository.deleteTypewriter(id);
    }
}
