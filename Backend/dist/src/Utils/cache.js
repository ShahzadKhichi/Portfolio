"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CACHE_TTL_SECONDS = void 0;
exports.getCache = getCache;
exports.setCache = setCache;
exports.deleteCache = deleteCache;
exports.invalidateCachePattern = invalidateCachePattern;
const redis_1 = __importDefault(require("./redis"));
exports.DEFAULT_CACHE_TTL_SECONDS = 7 * 24 * 60 * 60;
async function getCache(key) {
    if (!redis_1.default)
        return null;
    try {
        const data = await redis_1.default.get(key);
        if (data) {
            return JSON.parse(data);
        }
    }
    catch (error) {
        console.error(`Error getting cache for key ${key}:`, error);
    }
    return null;
}
async function setCache(key, data, ttlSeconds = exports.DEFAULT_CACHE_TTL_SECONDS) {
    if (!redis_1.default)
        return;
    try {
        const value = JSON.stringify(data);
        await redis_1.default.setex(key, ttlSeconds, value);
    }
    catch (error) {
        console.error(`Error setting cache for key ${key}:`, error);
    }
}
async function deleteCache(key) {
    if (!redis_1.default)
        return;
    try {
        if (Array.isArray(key)) {
            if (key.length > 0) {
                await redis_1.default.del(...key);
            }
        }
        else {
            await redis_1.default.del(key);
        }
    }
    catch (error) {
        console.error(`Error deleting cache for key ${key}:`, error);
    }
}
async function invalidateCachePattern(pattern) {
    if (!redis_1.default)
        return;
    try {
        const keys = await redis_1.default.keys(pattern);
        if (keys.length > 0) {
            await redis_1.default.del(...keys);
        }
    }
    catch (error) {
        console.error(`Error invalidating cache pattern ${pattern}:`, error);
    }
}
