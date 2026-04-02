import { injectable } from "tsyringe";
import Admin, { IAdmin } from "../Models/Admin.Model";
import { IUserRepository } from "../interfaces/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
    public async findByEmail(email: string): Promise<IAdmin | null> {
        return await Admin.findOne({ email });
    }

    public async createAdmin(adminData: Partial<IAdmin>): Promise<IAdmin> {
        return await Admin.create(adminData);
    }

    public async updateAdmin(email: string, updateData: Partial<IAdmin>): Promise<IAdmin | null> {
        return await Admin.findOneAndUpdate({ email }, updateData, { new: true });
    }

    public async findById(id: string): Promise<IAdmin | null> {
        return await Admin.findById(id);
    }
}
