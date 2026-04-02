import { injectable } from "tsyringe";
import Profile, { IProfile } from "../Models/Profile.Model";
import { IProfileRepository } from "../interfaces/IProfileRepository";

@injectable()
export class ProfileRepository implements IProfileRepository {
    public async getProfile(): Promise<IProfile | null> {
        return await Profile.findOne();
    }

    public async updateProfile(data: Partial<IProfile>): Promise<IProfile | null> {
        let profile = await Profile.findOne();
        if (profile) {
            return await Profile.findOneAndUpdate({}, data, { new: true });
        } else {
            return await Profile.create(data);
        }
    }
}
