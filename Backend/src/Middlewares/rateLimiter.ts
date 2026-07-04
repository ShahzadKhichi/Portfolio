import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../Utils/redis";

// Create RedisStore if Redis is connected, otherwise fallback to MemoryStore
const store = redis
  ? new RedisStore({
      // @ts-ignore
      sendCommand: async (...args: string[]) => {
        return redis!.call(args[0], ...args.slice(1));
      },
    })
  : undefined;

// General API rate limiter (150 requests per 15 minutes)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
  store: store,
});

// Stricter rate limiter for sending emails (5 requests per 10 minutes)
export const mailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many emails sent from this IP, please try again after 10 minutes.",
  },
  store: store,
});

// Stricter rate limiter for auth / login / OTP routes (10 requests per 15 minutes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 15 minutes.",
  },
  store: store,
});
