import mongoose, { Document, Schema } from "mongoose";

export interface ITypewriter extends Document {
  text: string;
}

const typewriterSchema = new Schema<ITypewriter>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Typewriter = mongoose.model<ITypewriter>("Typewriter", typewriterSchema);

export default Typewriter;
