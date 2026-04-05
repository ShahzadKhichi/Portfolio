import { ITypewriter } from "../Models/Typewriter.Model";

export interface ITypewriterRepository {
    getAllTypewriters(): Promise<ITypewriter[]>;
    getTypewriterById(id: string): Promise<ITypewriter | null>;
    createTypewriter(data: Partial<ITypewriter>): Promise<ITypewriter>;
    updateTypewriter(id: string, data: Partial<ITypewriter>): Promise<ITypewriter | null>;
    deleteTypewriter(id: string): Promise<ITypewriter | null>;
}
