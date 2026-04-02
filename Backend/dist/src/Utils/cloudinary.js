"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadToCloudinary = async (fileBuffer, mimetype) => {
    try {
        const b64 = Buffer.from(fileBuffer).toString("base64");
        const dataURI = "data:" + mimetype + ";base64," + b64;
        const response = await cloudinary_1.v2.uploader.upload(dataURI, {
            resource_type: "auto",
            folder: "portfolio",
        });
        return response.secure_url;
    }
    catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
