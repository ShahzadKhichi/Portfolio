import { IAdmin } from "../Models/Admin.Model";

export interface IUserRepository {
    findByEmail(email: string): Promise<IAdmin | null>;
    createAdmin(adminData: Partial<IAdmin>): Promise<IAdmin>;
    updateAdmin(email: string, updateData: Partial<IAdmin>): Promise<IAdmin | null>;
}
