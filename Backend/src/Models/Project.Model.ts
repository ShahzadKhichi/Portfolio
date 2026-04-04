import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image: {
    secureUrl: string;
    publicId: string;
  };
  tags?: string[];
  github?: string;
  live?: string;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
    tags: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      required: false,
    },
    live: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
