import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image?: string;
  imagePublicId?: string;
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
      type: String,
      required: false,
    },
    imagePublicId: {
      type: String,
      required: false,
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
