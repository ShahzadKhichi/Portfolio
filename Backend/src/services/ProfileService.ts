import { injectable, inject } from "tsyringe";
import { TYPES } from "../interfaces/types";
import { IProfile } from "../Models/Profile.Model";
import { IProfileRepository } from "../interfaces/IProfileRepository";
import { IProfileService } from "../interfaces/IProfileService";

@injectable()
export class ProfileService implements IProfileService {
    constructor(
        @inject(TYPES.IProfileRepository) private profileRepository: IProfileRepository
    ) {}

    public async getProfile(): Promise<IProfile | null> {
        return await this.profileRepository.getProfile();
    }

    public async updateProfile(data: Partial<IProfile>): Promise<IProfile | null> {
        return await this.profileRepository.updateProfile(data);
    }

    public async incrementViews(): Promise<void> {
        await this.profileRepository.incrementViews();
    }
}
