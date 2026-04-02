import mongoose, { Document, Schema } from "mongoose";

export interface IMail extends Document {
  name: string;
  from: string;
  message: string;
}

const mailSchema = new Schema<IMail>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Mail = mongoose.model<IMail>("Mail", mailSchema);

export default Mail;
