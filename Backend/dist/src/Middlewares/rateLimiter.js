"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.mailLimiter = exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const redis_1 = __importDefault(require("../Utils/redis"));
const createStore = (prefix) => {
    if (!redis_1.default)
        return undefined;
    return new rate_limit_redis_1.default({
        prefix,
        // @ts-ignore
        sendCommand: async (...args) => {
            return redis_1.default.call(args[0], ...args.slice(1));
        },
    });
};
// General API rate limiter (150 requests per 15 minutes)
exports.apiLimiter = (0, express_rate_limit_1.default)({
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
exports.mailLimiter = (0, express_rate_limit_1.default)({
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
exports.authLimiter = (0, express_rate_limit_1.default)({
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
