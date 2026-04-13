import { IProfile } from "../Models/Profile.Model";

export interface IProfileService {
    getProfile(): Promise<IProfile | null>;
    updateProfile(data: Partial<IProfile>): Promise<IProfile | null>;
    incrementViews(): Promise<void>;
}
