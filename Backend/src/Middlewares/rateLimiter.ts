import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import redis from "../Utils/redis";

const createStore = (prefix: string) => {
  if (!redis) return undefined;

  return new RedisStore({
    prefix,
    // @ts-ignore
    sendCommand: async (...args: string[]) => {
      return redis!.call(args[0], ...args.slice(1));
    },
  });
};

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
  store: createStore("rl:api"),
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
  store: createStore("rl:mail"),
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
  store: createStore("rl:auth"),
});
