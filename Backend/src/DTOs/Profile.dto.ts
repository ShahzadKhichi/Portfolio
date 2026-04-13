import { IProfile } from "../Models/Profile.Model";

export interface ProfileResponseDTO {
    _id: string;
    bio: string;
    profileImage: string;
    phoneNumber?: string;
    location?: string;
    resumeUrl?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        instagram?: string;
    };
    views: number;
}

export class ProfileDTO {
    public static toResponse(profile: IProfile): ProfileResponseDTO {
        return {
            _id: profile._id as string,
            bio: profile.bio,
            profileImage: profile.image.secureUrl,
            phoneNumber: profile.phoneNumber,
            location: profile.location,
            resumeUrl: profile.resumeUrl,
            socialLinks: profile.socialLinks,
            views: profile.views || 0,
        };
    }
}
