import { injectable } from "tsyringe";
import Typewriter, { ITypewriter } from "../Models/Typewriter.Model";
import { ITypewriterRepository } from "../interfaces/ITypewriterRepository";

@injectable()
export class TypewriterRepository implements ITypewriterRepository {
    public async getAllTypewriters(): Promise<ITypewriter[]> {
        return await Typewriter.find().sort({ createdAt: 1 });
    }

    public async getTypewriterById(id: string): Promise<ITypewriter | null> {
        return await Typewriter.findById(id);
    }

    public async createTypewriter(data: Partial<ITypewriter>): Promise<ITypewriter> {
        return await Typewriter.create(data);
    }

    public async updateTypewriter(id: string, data: Partial<ITypewriter>): Promise<ITypewriter | null> {
        return await Typewriter.findByIdAndUpdate(id, data, { new: true });
    }

    public async deleteTypewriter(id: string): Promise<ITypewriter | null> {
        return await Typewriter.findByIdAndDelete(id);
    }
}
