"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisUrl = process.env.REDIS_URL;
let redis = null;
if (redisUrl) {
    try {
        // Config for TLS if rediss:// is used
        const options = redisUrl.startsWith("rediss://")
            ? { tls: { rejectUnauthorized: false } }
            : {};
        redis = new ioredis_1.default(redisUrl, options);
        redis.on("connect", () => {
            console.log("Redis connected successfully.");
        });
        redis.on("error", (err) => {
            console.error("Redis connection error:", err);
        });
    }
    catch (error) {
        console.error("Failed to initialize Redis client:", error);
    }
}
else {
    console.warn("REDIS_URL not found in environment variables. Caching and queueing will run in fallback modes.");
}
exports.default = redis;
