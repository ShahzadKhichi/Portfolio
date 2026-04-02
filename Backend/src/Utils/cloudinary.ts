import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer: Buffer, mimetype: string): Promise<string | null> => {
  try {
    const b64 = Buffer.from(fileBuffer).toString("base64");
    const dataURI = "data:" + mimetype + ";base64," + b64;
    
    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "portfolio",
    });
    
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};
