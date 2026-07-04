import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisUrl = process.env.REDIS_URL;

let redis: Redis | null = null;

if (redisUrl) {
  try {
    // Config for TLS if rediss:// is used
    const options = redisUrl.startsWith("rediss://") 
      ? { tls: { rejectUnauthorized: false } } 
      : {};

    redis = new Redis(redisUrl, options);

    redis.on("connect", () => {
      console.log("Redis connected successfully.");
    });

    redis.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
  } catch (error) {
    console.error("Failed to initialize Redis client:", error);
  }
} else {
  console.warn("REDIS_URL not found in environment variables. Caching and queueing will run in fallback modes.");
}

export default redis;
