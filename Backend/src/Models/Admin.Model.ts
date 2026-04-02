import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  password: string;
  resetOtp?: string;
  resetOtpExpiry?: Date;
  isVerified: boolean;
  registrationOtp?: string;
  registrationOtpExpiry?: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
      lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
      },
    },
    password: {
      type: String,
      required: true,
    },
    resetOtp: {
      type: String,
      required: false,
    },
    resetOtpExpiry: {
      type: Date,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    registrationOtp: {
      type: String,
      required: false,
    },
    registrationOtpExpiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
