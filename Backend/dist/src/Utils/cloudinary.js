"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPublicId = exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
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
        return {
            url: response.secure_url,
            public_id: response.public_id,
        };
    }
    catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id)
            return;
        await cloudinary_1.v2.uploader.destroy(public_id);
    }
    catch (error) {
        console.error("Cloudinary Delete Error:", error);
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
const extractPublicId = (url) => {
    if (!url || !url.includes("cloudinary.com"))
        return "";
    try {
        const parts = url.split("/");
        const uploadIndex = parts.indexOf("upload");
        if (uploadIndex === -1)
            return "";
        let startIndex = uploadIndex + 1;
        if (parts[startIndex].startsWith("v")) {
            startIndex++;
        }
        const publicIdWithExt = parts.slice(startIndex).join("/");
        const publicId = publicIdWithExt.split(".").slice(0, -1).join(".");
        return publicId;
    }
    catch (error) {
        console.error(`Error extracting publicId from URL: ${url}`, error);
        return "";
    }
};
exports.extractPublicId = extractPublicId;
