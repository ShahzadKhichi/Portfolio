import mongoose, { Document, Schema } from "mongoose";

export interface ISkill extends Document {
  name: string;
  level: number; // 0 to 100
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Mobile" | "Other";
  icon?: string;
}

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"],
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
