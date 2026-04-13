"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDTO = void 0;
class ProfileDTO {
    static toResponse(profile) {
        return {
            _id: profile._id,
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
exports.ProfileDTO = ProfileDTO;
