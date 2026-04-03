import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  bio: string;
  profileImage: string;
  profileImagePublicId?: string;
  phoneNumber?: string;
  location?: string;
  resumeUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const profileSchema = new Schema<IProfile>(
  {
    bio: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    profileImagePublicId: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
