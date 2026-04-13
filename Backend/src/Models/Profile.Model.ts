import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  bio: string;
  image: {
    secureUrl: string;
    publicId: string;
  };
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

const profileSchema = new Schema<IProfile>(
  {
    bio: {
      type: String,
      required: true,
    },
    image: {
      secureUrl: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
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
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
