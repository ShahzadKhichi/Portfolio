import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  mimetype: string
): Promise<{ url: string; public_id: string } | null> => {
  try {
    const b64 = Buffer.from(fileBuffer).toString("base64");
    const dataURI = "data:" + mimetype + ";base64," + b64;

    const response = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      folder: "portfolio",
    });

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export const deleteFromCloudinary = async (public_id: string): Promise<void> => {
  try {
    if (!public_id) return;
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
  }
};
